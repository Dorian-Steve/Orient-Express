import { redirect } from "next/navigation"; // This is a server-side redirect

export default function HomePageRedirect() {
  // This component will immediately redirect to /home on the server
  redirect("/home");
}
