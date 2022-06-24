import React, { useState } from "react";

export const Card = ({
  data: {
    title,
    _id,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
  deleteCard,
  editCardStatus,
  data,
}) => {
  const [showMore, setShowMore] = useState(false);
  const datetime = new Date(createdAt).toLocaleString() + " hs.";

  const limitString = (str) => {
    if (str.length > 80) {
      return { string: str.slice(0, 77).concat("..."), addButton: true };
    } else {
      return { string: str, addButton: false };
    }
  };

  return (
    <div className="card">
      <div className="close" onClick={() => deleteCard(_id)}>
        x
      </div>
      <h3>{title}</h3>
      <h6>{datetime}</h6>
      <h5>{userName} </h5>
      <button
        className={status.toLowerCase()}
        onClick={() => editCardStatus(data)}
      >
        {status.toLowerCase()}{" "}
      </button>
      <button className={importance.toLowerCase()}>
        {importance.toLowerCase()}
      </button>
      {/* se aplica la función a la descripción para que devuelta el return (string) y se condiciona la muestra del string cortado*/}
      {!showMore && <p>{limitString(description).string}</p>}
      {showMore && (
        <>
          <p>{description}</p>
          {/* Hace lo contrario y recorta la descripción de vuelta */}
          <button type="button" onClick={() => setShowMore(false)}>
            Ver menos
          </button>{" "}
        </>
      )}
      {/* Si se cumple la condición del string se crea un botón para acceder al resto de la información */}
      {!showMore && limitString(description).addButton && (
        <button type="button" onClick={() => setShowMore(true)}>
          Ver más
        </button>
      )}
    </div>
  );
};
