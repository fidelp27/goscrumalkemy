import React from "react";

export const Card = ({ data }) => {
  const { title, datatime, creator, description, type, priority } = data;

  return (
    <div className="card">
      <div className="close">x</div>
      <h3>{title}</h3>
      <h6>{datatime}</h6>
      <h5>{creator} </h5>
      <button>{type} </button>
      <button>{priority}</button>
      <p>{description}</p>
    </div>
  );
};
