import React from "react";
import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineGithub,
} from "react-icons/ai";
import { FiGithub } from "react-icons/fi";

export const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 bg-white flex justify-between items-center">
      <Link href="/" className="text-pink-600 text-xl font-bold">
        Best Food Order
      </Link>
      <div className="flex gap-2 text-3xl cursor-pointer">
        <AiOutlineInstagram />
        <AiOutlineFacebook />
        <a href="https://github.com/fcbjimmy/food-ordering" target="_blank">
          <AiOutlineGithub />
        </a>
      </div>
      <p>All rights reserved</p>
    </div>
  );
};
