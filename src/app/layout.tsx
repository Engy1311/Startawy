import type { Metadata } from "next";
import "../styles/index.css";
"use client";

import React, { useEffect } from "react";
import { SnackBarProvider } from "./components/context/SnackBarContext";
import { useThemeStore } from "./store/useThemeStore";

export const metadata: Metadata = {
  title: "Startawy",
  description:
    "Startawy – a financial advisory platform for startup founders in Egypt and the MENA region.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <html lang="en">
      <body>
        <SnackBarProvider>{children}</SnackBarProvider>
      </body>
    </html>
  );
}


