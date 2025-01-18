import React from "react";
import Link from "next/link";
import { MdBugReport } from "react-icons/md";

function NavBar() {
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
              className="text-zinc-400 hover:text-zinc-800 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
