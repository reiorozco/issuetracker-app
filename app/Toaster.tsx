"use client";

import React from "react";
import { Toaster as HotToaster } from "react-hot-toast";

// Single, theme-aware toaster mounted once in the layout. Uses Radix CSS
// variables so toasts adapt to light/dark automatically.
function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--color-panel-solid)",
          color: "var(--gray-12)",
          border: "1px solid var(--gray-a5)",
          borderRadius: "var(--radius-3)",
          fontSize: "14px",
          padding: "10px 14px",
        },
        success: { iconTheme: { primary: "var(--green-9)", secondary: "white" } },
        error: { iconTheme: { primary: "var(--red-9)", secondary: "white" } },
      }}
    />
  );
}

export default Toaster;
