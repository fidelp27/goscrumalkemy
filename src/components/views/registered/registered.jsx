import React from "react";
import { Link, useParams } from "react-router-dom";
import "./registered.css";

const Registered = () => {
  const { teamID } = useParams();

  return (
    <div className="container-registered">
      <div className="container-data">
        <p>Te has registrado en el team: </p>
        <p className="team-id">{teamID}</p>
        <div className="container-share">
          <p>Comparte el ID con tu equipo: </p>
          <a
            href={`mailto:?subject=Team ID&body= El ID de nuestro team es ${teamID}`}
          >
            <img
              src="https://i.imgur.com/RL6XERO.png"
              alt="gmail"
              className="img-mail"
            />
          </a>
        </div>
      </div>
      <Link to="/login" className="login-registered">
        Login
      </Link>
    </div>
  );
};

export default Registered;
