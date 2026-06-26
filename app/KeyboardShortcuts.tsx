"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Flex, Kbd, Text } from "@radix-ui/themes";

const shortcuts: { keys: string[]; label: string }[] = [
  { keys: ["/"], label: "Focus search" },
  { keys: ["c"], label: "Create new issue" },
  { keys: ["?"], label: "Show this help" },
];

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    el.isContentEditable
  );
}

function KeyboardShortcuts() {
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState(false);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      if (e.key === "/") {
        const search = document.querySelector<HTMLInputElement>(
          "[data-search-input]",
        );
        if (search) {
          e.preventDefault();
          search.focus();
        }
        return;
      }

      if (e.key === "c") {
        e.preventDefault();
        router.push("/issues/new");
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((open) => !open);
      }
    },
    [router],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <Dialog.Root open={helpOpen} onOpenChange={setHelpOpen}>
      <Dialog.Content maxWidth="380px">
        <Dialog.Title size="4">Keyboard shortcuts</Dialog.Title>
        <Dialog.Description size="2" color="gray" mb="4">
          Speed up common actions.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {shortcuts.map(({ keys, label }) => (
            <Flex key={label} justify="between" align="center">
              <Text size="2">{label}</Text>
              <Flex gap="1">
                {keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default KeyboardShortcuts;
