import { Folder, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { TableRow } from "~/components/ui/table";
import { TableCell } from "~/components/ui/table";
import { deleteFile } from "~/server/actions";
import type { files_table, folders_table } from "~/server/db/schema";

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
      <TableCell>{file.name}</TableCell>
      <TableCell>{formattedSize}</TableCell>
      <TableCell>{"File"}</TableCell>
    </TableRow>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;
  return (
    <TableRow key={folder.id}>
      <TableCell>{folder.name}</TableCell>
      <TableCell>{"--"}</TableCell>
      <TableCell>{"Folder"}</TableCell>
    </TableRow>
  );
}
