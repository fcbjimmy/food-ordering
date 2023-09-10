"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { NEXT_URL } from "@/utils/url";

const Orders = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated" || !session) {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetch(`${NEXT_URL}/api/orders`).then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`${NEXT_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleUpdate = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success("Order has been updated");
  };

  if (isLoading || status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      {data.length > 0 ? (
        <table className="w-full border-separate border-spacing-3">
          <thead className="">
            <tr className="text-left">
              <th className="hidden md:block">Order ID</th>
              <th>Date</th>
              <th>Price</th>
              <th className="hidden md:block">Products</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((item: Order) => (
              <tr
                className={`text-sm md:text-base ${
                  item.status !== "Delivered" && "bg-red-200"
                }`}
                key={item.id}
              >
                <td className="hidden md:block py-6 px-1">{item.id}</td>
                <td className="py-6 px-1">
                  {item.createdAt.toString().slice(0, 10)}
                </td>
                <td className="py-6 px-1">{item.price}</td>
                <td className="hidden md:block py-6 px-1">
                  {item.products[0].title}
                </td>
                {session?.user.isAdmin ? (
                  <td>
                    <form
                      className="flex justify-center items-center gap-3"
                      onSubmit={(e) => handleUpdate(e, item.id)}
                    >
                      <input
                        placeholder={item.status}
                        className="p-1 rounded-md ring-2 ring-pink-500"
                      />
                      <button>
                        <BiEdit className="text-3xl text-pink-600" />
                      </button>
                    </form>
                  </td>
                ) : (
                  <td className="py-6 px-1">{item.status}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex justify-center items-center">
          <h3 className="text-2xl text-pink-600">No orders</h3>
        </div>
      )}
    </div>
  );
};

export default Orders;
