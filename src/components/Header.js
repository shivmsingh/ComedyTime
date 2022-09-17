import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../App";
import { supabase } from "../config/supabaseClient";
import ThemeSelector from "./ThemeSelector";

const Header = () => {
  const { session, username } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/");
    }
  };
  return (
    <header>
      <nav>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/create">New Joke</Link>
                </li>
                {!session ? (
                  <li>
                    <Link to="/auth">Login</Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to={`/user/${username}`}>{username}</Link>
                    </li>
                    <li>
                      <button onClick={handleSignOut}>Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <Link
              className="normal-case text-2xl text-primary font-bold"
              to="/"
            >
              Funny Jokes
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link to="/create">New Joke</Link>
              </li>
              {!session ? (
                <li>
                  <Link to="/auth">Login</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to={`/user/${username}`}>{username}</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="navbar-end">
            <ThemeSelector />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
