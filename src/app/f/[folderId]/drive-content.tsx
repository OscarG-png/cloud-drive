"use client";

import { ChevronRight, FolderPlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/components/uploadthing";
import { createFolder } from "~/server/actions";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { columns } from "./columns";

export default function GoogleDriveClone(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

  const filesTable = useReactTable({
    data: props.files,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const foldersTable = useReactTable({
    data: props.folders,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/drive" className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <Table>
            <TableHeader>
              {foldersTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {foldersTable.getRowModel().rows.map((row) => (
                <FolderRow key={row.id} folder={row.original} />
              ))}
              {filesTable.getRowModel().rows.map((row) => (
                <FileRow
                  key={row.id}
                  file={row.original as typeof files_table.$inferSelect}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <form
            action={async () => {
              const folderName = prompt("Enter folder name");
              if (!folderName) return;
              await createFolder({
                name: folderName,
                parentId: props.currentFolderId,
              });
              navigate.refresh();
            }}
          >
            <Button variant="ghost">
              <FolderPlus />
              New Folder
            </Button>
          </form>
          <UploadButton
            endpoint="driveUploader"
            appearance={{
              button: {
                backgroundColor: "transparent",
                color: "white",
                padding: "8px 32px",
                height: "40px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                textWrap: "nowrap",
              },
            }}
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            input={{
              folderId: props.currentFolderId,
            }}
          />
        </div>
      </div>
    </main>
  );
}
