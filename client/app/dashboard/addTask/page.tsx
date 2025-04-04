"use client";

import { DatePickerDemo } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

const AddTask = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log("Task Added");
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
            className="p-2 border-2 border-gray-500 rounded w-full"
          />
        </div>
        <div>
          <div>Priority</div>
          <select className="p-2 border-2 border-gray-500 rounded w-full">
            <option value="">Please select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <div>Status</div>
          <select className="p-2 border-2 border-gray-500 rounded w-full">
            <option value="">Please select</option>
            <option value="started">Started</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <div>Due Date</div>
          <div className="w-full">
            <DatePickerDemo />
          </div>
        </div>
        <Button className="w-fit">Add Task</Button>
      </form>
    </div>
  );
};

export default AddTask;
