import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContent from "~/app/drive-content";

export default async function DriveClone(props: {
  params: Promise<{ folderId: number }>;
}) {
  const params = await props.params;
  console.log(params.folderId);
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);

  return <DriveContent files={files} folders={folders} />;
}
