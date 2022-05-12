import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("logged");
    navigate("/", { replace: true });
  };

  return (
    <header>
      <span>Go Scrum</span>
      <div onClick={handleLogout}>x</div>
    </header>
  );
};
export default Header;
