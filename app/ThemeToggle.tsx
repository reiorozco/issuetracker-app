"use client";

import React, { useEffect, useState } from "react";
import { IconButton } from "@radix-ui/themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

type Appearance = "light" | "dark";

function ThemeToggle() {
  const [theme, setTheme] = useState<Appearance>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Appearance = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(next);
    root.style.colorScheme = next;

    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }

    setTheme(next);
  };

  return (
    <IconButton
      variant="ghost"
      color="gray"
      radius="full"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      // Avoid a hydration mismatch on the icon: only reflect real state once mounted.
      style={mounted ? undefined : { visibility: "hidden" }}
    >
      {theme === "dark" ? (
        <MdLightMode size="1.25em" />
      ) : (
        <MdDarkMode size="1.25em" />
      )}
    </IconButton>
  );
}

export default ThemeToggle;
