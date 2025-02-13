import DriveContent from "~/app/drive-content";
import { QUERIES } from "~/server/db/queries";

export default async function DriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderid = parseInt(params.folderId);
  if (isNaN(parsedFolderid)) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderid),
    QUERIES.getFiles(parsedFolderid),
    QUERIES.getAllParentsForFolder(parsedFolderid),
  ]);

  return <DriveContent files={files} folders={folders} parents={parents} />;
}
