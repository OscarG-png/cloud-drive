import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { deleteFile } from "~/server/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { files_table, folders_table } from "~/server/db/schema";

type Folder = typeof folders_table.$inferSelect;
type File = typeof files_table.$inferSelect;

export default function DropDownMenu(props: {
  type: "file" | "folder";
  data: File | Folder;
}) {
  if (props.type === "file") {
    return <FileDropdown file={props.data as File} />;
  }
  return <FolderDropdown folder={props.data as Folder} />;
}

function FileDropdown(props: { file: File }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!border-black bg-gray-500">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={props.file.url} target="-blank">
            {"Download"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>{"Copy Link"}</DropdownMenuItem>
        <DropdownMenuItem>{"Move File"}</DropdownMenuItem>
        <DropdownMenuItem className="text-red-700">{"Delete"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FolderDropdown(props: { folder: Folder }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!border-black bg-gray-500">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {/* <DropdownMenuItem>{"Download"}</DropdownMenuItem>
        <DropdownMenuItem>{"Copy Link"}</DropdownMenuItem>
        <DropdownMenuItem>{"Move File"}</DropdownMenuItem> */}
        <DropdownMenuItem className="text-red-700">{"Delete"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
