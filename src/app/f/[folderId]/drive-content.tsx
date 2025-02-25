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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function GoogleDriveClone(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

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
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.folders.map((folder) => (
                <TableRow key={folder.id}>
                  <TableCell>{folder.name}</TableCell>
                  <TableCell>{"--"}</TableCell>
                  <TableCell>{"Folder"}</TableCell>
                </TableRow>
              ))}
              {props.files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{"File"}</TableCell>
                </TableRow>
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
