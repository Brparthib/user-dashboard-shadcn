import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAppContext } from "@/provider/AppProvider";
import type { TUser } from "@/types";

export default function ActionButton({ user }: { user: TUser }) {
  const { state, actions } = useAppContext();

  console.log(user);
  console.log(state.selectedUser);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="cursor-pointer" size="sm">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Take Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            actions.setSelectedUser(user);
            actions.printUser();
          }}
          className="cursor-pointer"
        >
          Print
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            actions.setModalOpen(true);
            actions.setFormType("update");
            actions.setSelectedUser(user);
          }}
          className="cursor-pointer"
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            actions.setAlertOpen(true);
            actions.setSelectedUser(user);
          }}
          className="cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
