import { Folder, FileIcon } from "lucide-react";
import Link from "next/link";
import { TableRow } from "~/components/ui/table";
import { TableCell } from "~/components/ui/table";
import type { files_table, folders_table } from "~/server/db/schema";
import DropDownMenu from "./file-dropdown";
function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;
  const formattedSize = formatFileSize(file.size);
  return (
    <TableRow key={file.id}>
      <TableCell>
        <Link
          href={file.url}
          target="_blank"
          className="flex items-center gap-2"
        >
          <FileIcon />
          {file.name}
        </Link>
      </TableCell>
      <TableCell>{formattedSize}</TableCell>
      <TableCell>{"File"}</TableCell>
      <TableCell>
        <DropDownMenu type="file" data={file} />
      </TableCell>
    </TableRow>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;
  return (
    <TableRow key={folder.id}>
      <TableCell>
        <Link href={`/f/${folder.id}`} className="flex items-center gap-2">
          <Folder />
          {folder.name}
        </Link>
      </TableCell>
      <TableCell>{"--"}</TableCell>
      <TableCell>{"Folder"}</TableCell>
      <TableCell>
        <DropDownMenu type="folder" data={folder} />
      </TableCell>
    </TableRow>
  );
}
