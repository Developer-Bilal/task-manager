import { MdDeleteForever } from "react-icons/md";

const DeleteTask = (props: any) => {
  const handleDelete = () => {
    // get id from props
    // send delete request to the backend
    // I can use alert here
    console.log(props.taskId);
    console.log("Task deleted");
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
