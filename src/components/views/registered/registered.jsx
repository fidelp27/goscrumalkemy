import React from "react";
import { useParams } from "react-router-dom";

const Registered = () => {
  const { teamID } = useParams();
  return <div>Te has registrado en el grupo {teamID} </div>;
};

export default Registered;
