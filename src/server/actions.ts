"use server";

import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import { files_table, folders_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { QUERIES } from "~/server/db/queries";

const utapi = new UTApi();

export async function deleteFile(fileId: number, fileKey: string) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const file = await db
    .delete(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );
  if (!file) {
    return { error: "File not found" };
  }
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  await utapi.deleteFiles(fileKey);
  return { success: true };
}

export async function deleteFolder(folderId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }
  const folders = await QUERIES.getFolders(folderId);
  const files = await QUERIES.getFiles(folderId);

  if (folders.length > 0) {
    await Promise.all(folders.map((folder) => deleteFolder(folder.id)));
  }
  if (files.length > 0) {
    await Promise.all(files.map((file) => deleteFile(file.id, file.fileKey)));
  }
  await db.delete(folders_table).where(eq(folders_table.id, folderId));
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}

export async function createFolder(newFolder: {
  name: string;
  parentId: number;
}) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  await db.insert(folders_table).values({
    name: newFolder.name,
    parent: newFolder.parentId,
    ownerId: session.userId,
  });

  return { success: true };
}
