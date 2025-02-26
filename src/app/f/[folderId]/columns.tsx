"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { files_table, folders_table } from "~/server/db/schema";
import DropDownMenu from "./file-dropdown";

type File = typeof files_table.$inferSelect;
type Folder = typeof folders_table.$inferSelect;

// Union type for data that can be either a file or folder
type DriveItem = File | Folder;

export const columns: ColumnDef<DriveItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      // Files have size, folders don't
      return "size" in row.original ? formatFileSize(row.original.size) : "--";
    },
  },
  {
    id: "type",
    header: "Type",
    cell: ({ row }) => {
      // Determine type based on presence of properties
      return "fileKey" in row.original ? "File" : "Folder";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      if ("fileKey" in item) {
        return <DropDownMenu type="file" data={item} />;
      }
      return <DropDownMenu type="folder" data={item} />;
    },
  },
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
