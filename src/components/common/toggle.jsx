import { useTheme } from "../../contexts/theme.context";

function ToggleDarkMode() {
  const { theme, toggleDarkMode } = useTheme();

  return (
    <button
      className={`${theme === "dark" ? "btn btn-light" : "btn btn-dark"}`}
      onClick={toggleDarkMode}
    >
      {theme === "dark" ? (
        <i className="bi bi-brightness-low-fill text-warning"></i>
      ) : (
        <i className="bi bi-moon-fill"></i>
      )}
    </button>
  );
}

export default ToggleDarkMode;
