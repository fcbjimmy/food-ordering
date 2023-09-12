"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export const Userlinks = () => {
  const { data, status } = useSession();

  useEffect(() => {}, [data, status]);

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">Orders</Link>
          <span
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className="ml-4 cursor-pointer hover:bg-gray-100 p-2"
          >
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};
