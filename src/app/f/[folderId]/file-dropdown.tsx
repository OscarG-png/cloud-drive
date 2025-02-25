import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function FileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>{"Download"}</DropdownMenuItem>
        <DropdownMenuItem>{"Move File"}</DropdownMenuItem>
        <DropdownMenuItem>{"Delete"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
