import "server-only";
import { db } from "~/server/db";
import { eq, desc, and, isNull } from "drizzle-orm";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));
      if (!folder[0]) {
        return [];
      }
      parents.unshift(folder[0]);
      currentId = folder[0].parent;
    }
    return parents;
  },

  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId))
      .orderBy(desc(foldersSchema.createdAt));
  },
  getFiles: function (folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId))
      .orderBy(desc(filesSchema.createdAt));
  },
  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId));
    return folder[0];
  },

  getRootFolderForUser: async function (userId: string) {
    const rootFolder = await db
      .select()
      .from(foldersSchema)
      .where(
        and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)),
      );
    return rootFolder[0];
  },
};

export const MUTATIONS = {
  onBoardUser: async function (userId: string) {
    const rootFolder = await db
      .insert(foldersSchema)
      .values({
        name: "Root",
        parent: null,
        ownerId: userId,
      })
      .$returningId();
    const rootFolderId = rootFolder[0]!.id;
    await db.insert(foldersSchema).values([
      {
        name: "Trash",
        parent: rootFolderId,
        ownerId: userId,
      },
      {
        name: "Shared",
        parent: rootFolderId,
        ownerId: userId,
      },
      {
        name: "Documents",
        parent: rootFolderId,
        ownerId: userId,
      },
    ]);
    return rootFolderId;
  },
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      fileKey: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(filesSchema).values({
      ...input.file,
      ownerId: input.userId,
    });
  },
  createFolder: async function (input: {
    folder: {
      name: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(foldersSchema).values({
      ...input.folder,
      ownerId: input.userId,
    });
  },
};
