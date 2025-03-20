import { redirect } from "next/navigation";

export default function Home() {
  let session = false;

  if (!session) {
    redirect("/register");
  }

  return (
    <div>
      <div>Task Manager App</div>
    </div>
  );
}
