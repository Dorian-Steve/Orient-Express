"use client";

import { usePathname } from "next/navigation";
import Navbare from "./Navbar";

const HIDDEN_PATHS = ["/sign-in", "/sign-up"];

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (HIDDEN_PATHS.includes(pathname)) {
    return null; // Don't render Navbare on sign-in/sign-up pages
  }

  return <Navbare />;
}
