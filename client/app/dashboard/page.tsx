import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Link from "next/link";
import DeleteTask from "@/components/DeleteTask";
import CreateTaskBtn from "@/components/dashboard/CreateTaskBtn";

interface Task {
  id: number;
  text: string;
  status: string;
  priority: string;
  owner: string;
}

const getTasks = async () => {
  const res = await fetch(`http://localhost:5000/api/v1/tasks/`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });
  const tasks = await res.json();
  return tasks;
};

const Dashboard = async () => {
  const tasks = await getTasks();

  return (
    <div className="p-8 max-sm:p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl max-sm:hidden">My Tasks</div>
        <CreateTaskBtn />
      </div>
      <Table className="my-4">
        <TableCaption>A list of your recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Text</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((d: Task, index: number) => (
            <TableRow key={d.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{d.text}</TableCell>
              <TableCell>{d.status}</TableCell>
              <TableCell>{d.priority}</TableCell>
              <TableCell>{d.text}</TableCell>
              <TableCell>
                <Link href={`/dashboard/updateTask/${d.id}`}>
                  <HiMiniPencilSquare className="size-5 cursor-pointer text-blue-600 hover:text-blue-400" />
                </Link>
              </TableCell>
              <TableCell>
                <DeleteTask taskId={d.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
