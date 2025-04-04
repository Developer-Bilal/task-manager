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
  // TableFooter,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Link from "next/link";
import DeleteTask from "@/components/DeleteTask";

let data = [
  {
    id: 1,
    Text: "first Task",
    Status: "Pending",
    Priority: "High",
    Owner: "Bilal",
    DueDate: "20-2-2024",
  },
  {
    id: 2,
    Text: "Second Task",
    Status: "Pending",
    Priority: "High",
    Owner: "Bilal",
    DueDate: "20-2-2024",
  },
  {
    id: 3,
    Text: "Third Task",
    Status: "Pending",
    Priority: "High",
    Owner: "Bilal",
    DueDate: "20-2-2024",
  },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState(data);
  const router = useRouter();

  // useEffect(() => {
  //   console.log(tasks);
  // }, []);

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
          {data.map((d, index) => (
            <TableRow key={d.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{d.Text}</TableCell>
              <TableCell>{d.Status}</TableCell>
              <TableCell>{d.Priority}</TableCell>
              <TableCell>{d.DueDate}</TableCell>
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
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
};

export default Dashboard;
