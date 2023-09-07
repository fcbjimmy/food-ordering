"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Inputs = { title: string; desc?: string; price: number; catSlug: string };

type Option = { title: string; additionalPrice: number };

const AddProduct = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [options, setOptions] = useState<Option[]>([
    { title: "", additionalPrice: 0 },
  ]);

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center mt-16 mb-10">
      <form className="flex flex-wrap gap-4 shadow-lg p-8 md:w-1/2 ">
        <h3 className="text-3xl">Add Product</h3>
        <div className="w-full flex flex-col gap-2 ">
          <label htmlFor="title">Title</label>
          <input
            className="ring-1 ring-pink-500 p-2 rounded-sm"
            name="title"
            type="text"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            className="ring-1 ring-pink-500 p-2 rounded-sm"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label htmlFor="price">Price</label>
          <input
            className="ring-1 ring-pink-500 p-2 rounded-sm"
            name="price"
            type="number"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label htmlFor="catSlug">Category</label>
          <input
            className="ring-1 ring-pink-500 p-2 rounded-sm"
            name="catSlug"
            type="text"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label>Options (e.g. small, medium)</label>
          <div className="flex flex-col gap-2">
            <input
              className="ring-1 ring-pink-500 p-2 rounded-sm"
              name="title"
              type="text"
              placeholder="Title"
            />
            <input
              className="ring-1 ring-pink-500 p-2 rounded-sm"
              name="additionalPrice"
              type="number"
              placeholder="Additional Price"
            />
          </div>
        </div>
        <button className="w-52 ring-1 rounded-md bg-pink-400 text-white p-2">
          Add Option
        </button>
        <div className="w-full mt-2">
          <div className="w-40 ring-1 ring-pink-400 rounded-md p-3 mt-3 mb-3">
            <span>Small: </span>
            <span>$30</span>
          </div>
          <div className="w-40 ring-1 ring-pink-400 rounded-md p-3 mt-3 mb-3">
            <span>Small: </span>
            <span>$30</span>
          </div>
          <div className="w-40 ring-1 ring-pink-400 rounded-md p-3 mt-3 mb-3">
            <span>Small: </span>
            <span>$30</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
