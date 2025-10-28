import Modal from "@/components/modal/Modal";
import ActionButton from "@/components/table/ActionButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TUser } from "@/types";
import { UserForm } from "./UserForm";

const userData: TUser[] = [
  {
    id: 1,
    name: "Ariana Gomez",
    email: "ariana.gomez@example.com",
    dob: "1996-04-12",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    gender: "Female",
    bio: "Frontend developer passionate about crafting elegant UI experiences with React and Tailwind CSS.",
    designation: "Frontend Developer",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
  },
  {
    id: 2,
    name: "Rafiul Hasan",
    email: "rafiul.hasan@example.com",
    dob: "1998-09-25",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    gender: "Male",
    bio: "Full Stack Developer who loves building scalable web applications using the MERN stack.",
    designation: "Full Stack Developer",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux"],
  },
];

export default function UserList() {
  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <Modal title={"Create User"}>
            <UserForm />
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
            {userData.map((user, index) => (
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
