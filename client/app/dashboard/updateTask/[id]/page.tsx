"use client";

import { DatePickerDemo } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState<Date>();
  // get task id from url
  const params = useParams();

  // use effect to fetch data of that task
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/tasks/${params.id}`
        );
        const data = await res.json();
        setText(data.text);
        setPriority(data.priority);
        setStatus(data.status);
        setDate(data.dueDate);
        console.log(data);
      } catch (error: any) {
        console.log({ message: "Request Failed", error: error.message });
      }
    }
    getData();
  }, []);

  // form submit will send request to the backend to submit updated changes
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      id: params.id,
      text,
      status,
      priority,
      dueDate: date,
      ownerId: 1,
    };
    console.log(data);

    try {
      await fetch(`http://localhost:5000/api/v1/tasks/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      Swal.fire({
        title: "User Updated Successfully!",
        icon: "success",
        draggable: true,
      });
    } catch (error: any) {
      console.log({ message: "Request Failed!", error: error.message });
    }

    redirect("/dashboard");
  };
  return (
    <div className="p-8 max-sm:p-4 ">
      <div className="text-2xl">Update Task {params.id}</div>
      <form
        onSubmit={handleSubmit}
        className="p-8 grid grid-cols-2 gap-8 max-sm:grid-cols-1"
      >
        <div className="">
          <div>Text</div>
          <input
            type="text"
            className="p-2 border border-gray-500 rounded w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <div>Priority</div>
          <select
            className="p-2 border border-gray-500 rounded w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Please select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <div>Status</div>
          <select
            className="p-2 border border-gray-500 rounded w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Please select</option>
            <option value="Started">Started</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <div>Due Date</div>
          <div className="w-full">
            <DatePickerDemo date={date} setDate={setDate} />
          </div>
        </div>
        <Button className="w-fit">Update Task</Button>
      </form>
    </div>
  );
};

export default UpdateTask;
