import { Link, NavLink } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../contexts/auth.context";
import ToggleDarkMode from "./common/toggle";
import { useState, useEffect } from "react";

import useUser from "../hooks/getUser";

function NavBar({ search, setSearch }) {
  const { user } = useAuth();
  const { userInfo } = useUser(user?._id);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {user && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Actions
                </a>
                <ul className="dropdown-menu">
                  {user && user.isBusiness && (
                    <li className="nav-item">
                      <NavLink to="/my-cards" className="nav-link">
                        My Cards
                      </NavLink>
                    </li>
                  )}
                  {user && (
                    <li className="nav-item">
                      <NavLink to="/favoriteCards" className="nav-link">
                        Favorites
                      </NavLink>
                    </li>
                  )}
                  {user && user.isBusiness && (
                    <li className="nav-item">
                      <NavLink to="/createCard" className="nav-link">
                        Create Card
                      </NavLink>
                    </li>
                  )}
                </ul>
              </li>
            )}
            {user && user.isAdmin && (
              <li className="nav-item">
                <NavLink to="/control-panel" className="nav-link">
                  CRM
                </NavLink>
              </li>
            )}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/sign-out" className="nav-link">
                    Sign Out
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user-info/">
                    <div className="sign-in-border-pic">
                      <img
                        src={userInfo?.image?.url}
                        alt={userInfo?.image?.alt}
                        className="sign-in-pic"
                      />
                    </div>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/sign-in" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sign-up" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex justify-content-center">
            <ToggleDarkMode />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
