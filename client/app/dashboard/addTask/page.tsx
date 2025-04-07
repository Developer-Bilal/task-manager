"use client";

import { DatePickerDemo } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/tasks/`, {
          cache: "no-store",
        });
        const data = await res.json();
        setTasks(data);
        console.log(data);
      } catch (error: any) {
        console.log({ message: error.message });
      }
    }
    getData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      id: tasks.length + 1,
      text,
      status,
      priority,
      ownerId: 1,
    };

    try {
      await fetch(`http://localhost:5000/api/v1/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      Swal.fire({
        title: "Task Added Successfully!",
        icon: "success",
        draggable: true,
      });
    } catch (error: any) {
      console.log({ message: "Request Failed!", error: error.message });
    }
    setIsLoading(false);
    redirect("/dashboard");
  };
  return (
    <div className="p-8 max-sm:p-4 ">
      <div className="text-2xl">Add Task</div>
      <form
        onSubmit={handleSubmit}
        className="p-8 grid grid-cols-2 gap-8 max-sm:grid-cols-1"
      >
        <div className="">
          <div>Text</div>
          <input
            type="text"
            className="p-2 border border-gray-500 rounded w-full"
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <div>Priority</div>
          <select
            className="p-2 border border-gray-500 rounded w-full"
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Please select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <div>Status</div>
          <select
            className="p-2 border border-gray-500 rounded w-full"
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Please select</option>
            <option value="started">Started</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <div>Due Date</div>
          <div className="w-full">
            <DatePickerDemo date={date} setDate={setDate} />
          </div>
        </div>
        {!isLoading ? (
          <Button className="w-fit">Add Task</Button>
        ) : (
          <Button className="w-fit" disabled>
            Add Task
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddTask;
