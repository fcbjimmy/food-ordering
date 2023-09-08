"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Userlinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">Orders</Link>
          <span
            onClick={() => signOut()}
            className="ml-4 cursor-pointer hover:bg-gray-100 p-2"
          >
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login">Login!</Link>
      )}
    </div>
  );
};
