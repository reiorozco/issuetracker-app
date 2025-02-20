"use client";

import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { MdBugReport } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

function NavBar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  console.log("currentPath: ", currentPath);

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex space-x-4 border-b border-gray-200 mb-6 px-6 h-12 items-center">
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

      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out ({session?.user?.name})</Link>
        )}

        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
}

export default NavBar;
