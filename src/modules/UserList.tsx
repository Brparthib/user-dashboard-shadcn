import Modal from "@/components/shared/Modal";
import ActionButton from "@/components/shared/ActionButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserForm } from "./UserForm";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/provider/AppProvider";
import { updateUser } from "@/utils/constant";
import Alert from "@/components/shared/AlertDialog";
import { Badge } from "@/components/ui/badge";

export default function UserList() {
  const { state, actions } = useAppContext();

  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => {
              actions.setModalOpen(true);
              actions.setFormType("create");
              actions.setSelectedUser(updateUser);
            }}
            variant="outline"
            className="hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            size="sm"
          >
            Create User
          </Button>
        </div>
        {/* User list table */}
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
            {state.userData?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="select-none">{user.dob}</Badge>
                </TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell className="flex justify-end">
                  <ActionButton user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Modal */}
        <Modal
          isOpen={state.modalOpen}
          onClose={() => actions.setModalOpen(false)}
          title={state.formType === "create" ? "Create User" : "Update User"}
        >
          {state.formType === "create" ? <UserForm /> : <UserForm />}
        </Modal>

        {/* Alert  */}
        <div>
          <Alert
            isOpen={state.alertOpen}
            onClose={() => actions.setAlertOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
