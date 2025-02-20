"use client";

import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { MdBugReport } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";

function NavBar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  console.log("currentPath: ", currentPath);

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="border-b border-gray-200 mb-6 px-6 py-4">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="4">
            <Link href="/">
              <MdBugReport size="2em" />
            </Link>

            <ul className="flex flex-wrap space-x-4">
              {links.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={classNames({
                      "text-zinc-900": currentPath === href,
                      "text-zinc-400": currentPath !== href,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            {status === "authenticated" && (
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
                  <DropdownMenu.Label>
                    {session?.user?.email}
                  </DropdownMenu.Label>

                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="tomato">
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
      </Container>
    </nav>
  );
}

export default NavBar;
