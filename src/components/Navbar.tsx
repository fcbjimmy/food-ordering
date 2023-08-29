import React from "react";
import { Menu } from "./Menu";
import Link from "next/link";
import { CartIcon } from "./CartIcon";

export const Navbar = () => {
  const user = false;
  return (
    <nav className="h-12 text-pink-600 p-4 flex justify-between items-center border-b-2 border-b-pink-600 uppercase md:h-24 lg:px-20">
      {/* Left Links */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact">Contact</Link>
      </div>
      {/* Logo */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">Food Order</Link>
      </div>
      {/* menu */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* Right Links */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <Link href="/order">Orders</Link>
        )}
        <Link href="/cart">
          <CartIcon />
        </Link>
      </div>
    </nav>
  );
};
