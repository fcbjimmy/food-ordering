"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    }

    if (res.status === 200) {
      router.push("/menu");
      toast(data.message);
    }
  };

  return (
    <button
      className="absolute ring-1 ring-pink-600 p-2 top-4 right-4 rounded-md hover:bg-red-100"
      onClick={() => handleDelete(id)}
    >
      <RiDeleteBin5Fill className="text-2xl" />
    </button>
  );
};

export default DeleteButton;
