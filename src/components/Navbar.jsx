import styles from "../styles/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../mode/modeSlice";
import { logout } from "../mode/authSlice"; 

const Navbar = () => {
  const mode = useSelector((state) => state.mode.value);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleModeChange = () => {
    dispatch(toggleMode());
  };

  return (
    <nav className={`${styles["navbar"]}`}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {isLogin && <li><Link to="/add-profile">Add Profile</Link></li>}
      </ul>

      {isLogin ? (
        <button onClick={handleClick}>Logout</button>
      ) : (
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}

      <button onClick={handleModeChange}>
        {mode === "light" ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
