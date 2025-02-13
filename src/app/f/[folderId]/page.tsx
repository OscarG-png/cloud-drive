import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContent from "~/app/drive-content";
import { z } from "zod";

export default async function DriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderid = parseInt(params.folderId);
  if (isNaN(parsedFolderid)) {
    return <div>Invalid folder ID</div>;
  }

  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);

  return <DriveContent files={files} folders={folders} />;
}
