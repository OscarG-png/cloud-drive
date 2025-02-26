"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { files_table, folders_table } from "~/server/db/schema";

// Union type for data that can be either a file or folder
type DriveItem =
  | typeof files_table.$inferSelect
  | typeof folders_table.$inferSelect;

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
      return "size" in row.original ? row.original.size : "--";
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
];
