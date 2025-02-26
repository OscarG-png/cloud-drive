import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function DropDownMenu(props: {
  type: "file" | "folder";
  id: number;
}) {
  if (props.type === "file") {
    return <FileDropdown />;
  }
  return <FolderDropdown />;
}

function FileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>{"Download"}</DropdownMenuItem>
        <DropdownMenuItem>{"Copy Link"}</DropdownMenuItem>
        <DropdownMenuItem>{"Move File"}</DropdownMenuItem>
        <DropdownMenuItem>{"Delete"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FolderDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>{"Download"}</DropdownMenuItem>
        <DropdownMenuItem>{"Copy Link"}</DropdownMenuItem>
        <DropdownMenuItem>{"Move File"}</DropdownMenuItem>
        <DropdownMenuItem>{"Delete"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
