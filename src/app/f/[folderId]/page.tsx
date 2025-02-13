import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContent from "~/app/drive-content";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));
    if (!folder[0]) {
      throw new Error("Folder not found");
    }
    parents.unshift(folder[0]);
    currentId = folder[0].parent;
  }
  return parents;
}

export default async function DriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderid = parseInt(params.folderId);
  if (isNaN(parsedFolderid)) {
    return <div>Invalid folder ID</div>;
  }

  const foldersPromise = db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderid));
  const filesPromise = db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderid));
  const parentsPromise = getAllParents(parsedFolderid);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ]);

  return <DriveContent files={files} folders={folders} parents={parents} />;
}
