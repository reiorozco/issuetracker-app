"use client";

import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { MdBugReport } from "react-icons/md";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Spinner,
} from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";

function NavBar() {
  return (
    <nav className="border-b border-gray-200 mb-6 px-6 py-4">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="4">
            <Link href="/">
              <MdBugReport size="2em" />
            </Link>

            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === "loading") return <Spinner size="3" />;

  if (status === "unauthenticated")
    return (
      <button
        className="nav-link"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Login
      </button>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            fallback="?"
            src={session?.user?.image!}
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>{session?.user?.email}</DropdownMenu.Label>

          <DropdownMenu.Separator />
          <DropdownMenu.Item
            color="tomato"
            className="!cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}

function NavLinks() {
  const currentPath = usePathname();
  console.log("currentPath: ", currentPath);

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <ul className="flex flex-wrap space-x-4">
      {links.map(({ href, label }) => (
        <li key={label}>
          <Link
            href={href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": currentPath === href,
            })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavBar;
