"use client";
import { links } from "@/utils/constant";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { Box, Container, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const path = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link href="/">
              {" "}
              <AiFillBug />{" "}
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-900": link.href === path,
                      "text-zinc-500": link.href !== path,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Flex>
            <Box>
              {status === "authenticated" && (
                <Link href="/api/auth/signout">Logout</Link>
              )}

              {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Login</Link>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
