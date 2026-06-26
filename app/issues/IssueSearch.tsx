"use client";

import React, { useEffect, useRef, useState } from "react";
import { Kbd, TextField } from "@radix-ui/themes";
import { MdSearch } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

function IssueSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [value, setValue] = useState(urlQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const didMount = useRef(false);

  // Keep the latest searchParams available inside the debounced callback
  // without making it a dependency (which would re-fire on every URL change).
  const paramsRef = useRef(searchParams);
  paramsRef.current = searchParams;

  // Debounce typing → URL update (resets pagination, preserves other params).
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(paramsRef.current.toString());
      if (value) params.set("q", value);
      else params.delete("q");
      params.delete("page");

      const qs = params.toString();
      router.push(`/issues${qs ? `?${qs}` : ""}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, router]);

  // Reflect external URL changes (e.g. "Clear filters") when not actively typing.
  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setValue(urlQuery);
    }
  }, [urlQuery]);

  return (
    <TextField.Root
      ref={inputRef}
      data-search-input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search issues..."
      aria-label="Search issues"
      className="w-full max-w-xs"
    >
      <TextField.Slot>
        <MdSearch />
      </TextField.Slot>
      <TextField.Slot side="right">
        <Kbd>/</Kbd>
      </TextField.Slot>
    </TextField.Root>
  );
}

export default IssueSearch;
