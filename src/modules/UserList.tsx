import Modal from "@/components/modal/Modal";
import ActionButton from "@/components/table/ActionButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TUser } from "@/types";
import { UserForm } from "./UserForm";
import { useEffect } from "react";
import { useAppReducer } from "@/hooks/useAppReducer";
import { Button } from "@/components/ui/button";

export default function UserList() {
  const { state, actions } = useAppReducer();

  let userData: TUser[] = [];
  useEffect(() => {
    if (state.userData) {
      console.log("From UserList", state.userData);
      userData = state.userData;
    }
  }, [state.userData]);

  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => {
              actions.setModalOpen(true);
              actions.setFormType("create");
            }}
            variant="outline"
            className="hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            size="sm"
          >
            Create User
          </Button>
          <Modal
            isOpen={state.modalOpen}
            onClose={() => actions.setModalOpen(false)}
            title={state.formType === "create" ? "Create User" : "Update User"}
          >
            {state.formType === "create" ? <UserForm /> : <UserForm />}
          </Modal>
        </div>
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="w-[100px]">Index</TableHead>
              <TableHead>name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>dob</TableHead>
              <TableHead>gender</TableHead>
              <TableHead>designation</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dob}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell className="flex justify-end">
                  <ActionButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
