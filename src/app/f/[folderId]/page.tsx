import DriveContent from "~/app/drive-content";
import {
  getFolders,
  getFiles,
  getAllParentsForFolder,
} from "~/server/db/queries";

export default async function DriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderid = parseInt(params.folderId);
  if (isNaN(parsedFolderid)) {
    return <div>Invalid folder ID</div>;
  }

  const foldersPromise = getFolders(parsedFolderid);
  const filesPromise = getFiles(parsedFolderid);
  const parentsPromise = getAllParentsForFolder(parsedFolderid);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ]);

  return <DriveContent files={files} folders={folders} parents={parents} />;
}
