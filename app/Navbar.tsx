"use client";
import { links } from "@/utils/constant";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

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
                // <Link href="/api/auth/signout">Logout</Link>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Avatar
                      size="2"
                      fallback="?"
                      src={session.user!.image!}
                      className="cursor-pointer"
                    ></Avatar>
                    {/* <Text>eehehehe</Text> */}
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      <Text> {session.user?.email} </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">Log out</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
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
