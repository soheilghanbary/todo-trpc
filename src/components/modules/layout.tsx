import { ReactNode } from "react";
import Navbar from "./navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <Navbar />
      {children}
    </div>
  );
}
