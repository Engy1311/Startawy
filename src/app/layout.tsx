 "use client";

import React, { useEffect } from "react";
import "../styles/index.css";
import { SnackBarProvider } from "./components/context/SnackBarContext";
import { useThemeStore } from "./store/useThemeStore";

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

