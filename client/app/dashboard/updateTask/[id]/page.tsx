"use client";

import { useParams } from "next/navigation";

const UpdateTask = () => {
  // get task id from url
  const params = useParams();
  // use effect to fetch data of that task

  // form submit will send request to the backend to submit updated changes
  return (
    <>
      <div>Edit Task {params.id}</div>
    </>
  );
};

export default UpdateTask;
