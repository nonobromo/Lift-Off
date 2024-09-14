import { createContext, useState, useEffect, useContext } from "react";

export const themeContext = createContext({
  theme: localStorage.getItem("theme"),
});

export function ThemeSet({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((curr) => {
      const newTheme = curr === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <themeContext.Provider
      value={{ toggleDarkMode: toggleDarkMode, theme: theme }}
    >
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  return useContext(themeContext);
}
