"use client";

import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { MdBugReport } from "react-icons/md";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Spinner,
} from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import ThemeToggle from "@/app/ThemeToggle";

function NavBar() {
  return (
    <nav className="border-b mb-6 px-6 py-4" style={{ borderColor: "var(--gray-a5)" }}>
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="5">
            <Link href="/" aria-label="Issue Tracker home">
              <Flex align="center" style={{ color: "var(--accent-9)" }}>
                <MdBugReport size="1.75em" />
              </Flex>
            </Link>

            <NavLinks />
          </Flex>

          <Flex align="center" gap="3">
            <ThemeToggle />
            <AuthStatus />
          </Flex>
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
      <Button
        variant="soft"
        color="gray"
        className="!cursor-pointer"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Login
      </Button>
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

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <ul className="flex flex-wrap gap-5">
      {links.map(({ href, label }) => (
        <li key={label}>
          <Link
            href={href}
            aria-current={currentPath === href ? "page" : undefined}
            className={classNames({
              "nav-link": currentPath !== href,
              "nav-link-active": currentPath === href,
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
