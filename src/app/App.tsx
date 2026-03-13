import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { SnackBarProvider } from "./components/context/SnackBarContext";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
      <SnackBarProvider>
        <RouterProvider router={router} />
      </SnackBarProvider>
  );
}