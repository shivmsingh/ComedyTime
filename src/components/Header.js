import React from "react";
import { Link } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost normal-case text-xl px-0">
              Funny Jokes
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create New Joke</Link>
              </li>
            </ul>
          </div>
          <ThemeSelector />
        </div>
      </nav>
    </header>
  );
};

export default Header;
