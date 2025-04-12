"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Link from "next/link";
import DeleteTask from "@/components/DeleteTask";

interface Task {
  id: number;
  text: string;
  status: string;
  priority: string;
  owner: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  // need to change
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/tasks/`, {
          cache: "no-cache",
        });
        const data = await res.json();
        setTasks(data);
        console.log(data);
      } catch (error: any) {
        console.log({ message: error.message });
      }
    }
    getData();
  }, [tasks]);

  return (
    <div className="p-8 max-sm:p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl max-sm:hidden">My Tasks</div>
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/dashboard/addTask")}
        >
          Add task
        </Button>
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
          {tasks.map((d: Task, index) => (
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
