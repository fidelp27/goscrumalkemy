import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";

const Header = () => {
  let navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <header>
      <span>Go Scrum</span>
      <div className="wrapper_right_header">
        <div className="donate_box">
          <button
            className="donate_button"
            onClick={() => navigate("/donate", { replace: true })}
          >
            Donar
          </button>
        </div>
        <div className="tasks_number">Tareas creadas: {tasks?.length} </div>
        <div className="user">{localStorage.getItem("user")} </div>
        <div onClick={handleLogout}>x</div>
      </div>
    </header>
  );
};
export default Header;
