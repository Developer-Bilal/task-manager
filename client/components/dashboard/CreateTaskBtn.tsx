"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const CreateTaskBtn = () => {
  const router = useRouter();
  return (
    <Button
      className="cursor-pointer"
      onClick={() => router.push("/dashboard/addTask")}
    >
      Add task
    </Button>
  );
};

export default CreateTaskBtn;
