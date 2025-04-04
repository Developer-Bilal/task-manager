"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const UpdateTask = () => {
  // get task id from url
  const params = useParams();
  // use effect to fetch data of that task

  // form submit will send request to the backend to submit updated changes
  return (
    <div className="p-8 max-sm:p-4 ">
      <div className="text-2xl">Update Task {params.id}</div>
      <form className="p-8 grid grid-cols-2 gap-8 max-sm:grid-cols-1">
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
          <input
            type="text"
            className="p-2 border-2 border-gray-500 rounded w-full"
          />
        </div>
        <Button className="w-fit">Update Task</Button>
      </form>
    </div>
  );
};

export default UpdateTask;
