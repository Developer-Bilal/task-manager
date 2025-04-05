import { MdDeleteForever } from "react-icons/md";

const DeleteTask = (props: any) => {
  const handleDelete = async () => {
    // get id from props
    // send delete request to the backend
    // I can use alert here
    try {
      await fetch(`http://localhost:5000/api/v1/tasks/${props.taskId}`, {
        method: "DELETE",
      });
    } catch (error: any) {
      console.log({ message: "Request Failed!", error: error.message });
    }
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
