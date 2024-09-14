import { NavLink } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../contexts/auth.context";

function Footer() {
  const { user } = useAuth();

  return (
    <footer className="border-top text-center py-2 card-shadow">
      <ul
        className="list-group d-flex flex-row justify-content-center w-50 mx-auto mt-0 mb-2"
        style={{ listStyleType: "none" }}
      >
        <NavLink to="/about" className="nav-link">
          <li className="me-3">About</li>
        </NavLink>
        {user && user.isBusiness && (
          <NavLink to="/my-cards" className="nav-link">
            <li className="me-3">My Cards</li>
          </NavLink>
        )}
        {user && (
          <NavLink to="/favoriteCards" className="nav-link">
            <li className="me-3">Favorites</li>
          </NavLink>
        )}
        {user && user.isBusiness && (
          <NavLink to="/createCard" className="nav-link">
            <li className="me-3">Create Cards</li>
          </NavLink>
        )}
        {user && user.isAdmin && (
          <NavLink to="/control-panel" className="nav-link">
            <li className="me-3">CRM</li>
          </NavLink>
        )}
      </ul>
      <Logo />
      <span className="mx-2">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
}

export default Footer;
