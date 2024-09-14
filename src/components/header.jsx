import { useAuth } from "../contexts/auth.context";

import NavBar from "./navbar";

function Header({ search, setSearch }) {
  const { theme } = useAuth();

  return (
    <header
      className={theme === "dark" ? "dark navbar-bg" : "light card-shadow"}
    >
      <NavBar search={search} setSearch={setSearch} />
    </header>
  );
}

export default Header;
