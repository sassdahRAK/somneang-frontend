import { FaHeart, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <FaHome />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <FaSearch />
        <span>Search</span>
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <FaHeart />
        <span>Favorites</span>
      </NavLink>
      <NavLink
        to="/account"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <FaUser />
        <span>Account</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
