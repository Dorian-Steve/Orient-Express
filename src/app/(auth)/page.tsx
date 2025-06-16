import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return <SignIn />;
}
