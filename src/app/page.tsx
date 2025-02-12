import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContent from "./drive-content";

export default async function DriveClone() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);

  return <DriveContent files={files} folders={folders} />;
}
