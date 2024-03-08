"use client"
import { links } from "@/utils/constant";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
 const path  =  usePathname();
 console.log("path", path);

  
  return (
    <nav className="flex border-b space-x-6 mb-5 px-5 h-14 items-center">
      <Link href="/">
        {" "}
        <AiFillBug />{" "}
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}

            className={classNames({
            'text-zinc-900' :link.href === path,
            'text-zinc-500': link.href !== path,
            'hover:text-zinc-800 transition-colors': true
            })}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
