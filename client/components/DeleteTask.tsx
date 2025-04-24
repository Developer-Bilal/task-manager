"use client";

import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const DeleteTask = (props: any) => {
  const handleDelete = async () => {
    // get id from props
    // send delete request to the backend
    // I can use alert here

    // alert to show before deleting task
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // send request to the server

        fetch(`http://localhost:5000/api/v1/tasks/${props.taskId}`, {
          method: "DELETE",
        })
          .then(() => {
            // if success show alert
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            // if request fails console log message
            console.log({ message: "Request Failed!", error: error.message });
          });
      }
    });
  };
  return (
    <>
      <button onClick={handleDelete}>
        <MdDeleteForever className="size-5 cursor-pointer text-red-600 hover:text-red-400" />
      </button>
    </>
  );
};

export default DeleteTask;
