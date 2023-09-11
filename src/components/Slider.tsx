"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
  {
    id: 1,
    title: "the best pizza in town",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "affordable and tasty!",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza in town",
    image: "/slide3.jpg",
  },
];

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const timeId = setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 3);
      setCurrentSlide(randomNumber);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [currentSlide]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col text-pink-600 gap-8 font-bold lg:h-full">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <div
          className="bg-pink-600 text-white font-bold py-3 px-6 rounded-xl cursor-pointer"
          onClick={() => router.push("/menu")}
        >
          Order Now
        </div>
      </div>
      {/*  IMAGE CONTAINER*/}
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt="slide"
          fill
          className="object-cover"
        ></Image>
      </div>
    </div>
  );
};
