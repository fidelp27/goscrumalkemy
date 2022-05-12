import React from "react";
import Header from "../../header/header";
import "./task.css";
import { useResize } from "../../../hooks/useResize";
import { Card } from "../../card/card";
import { CardData } from "./data";

const Task = () => {
  const { isPhone } = useResize();

  const limitString = (str) => {
    if (str.length > 170) {
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    } else {
      return { string: str, addButton: false };
    }
  };

  const renderAllCards = () => {
    return CardData.map((elem) => <Card key={elem.id} data={elem} />);
  };

  return (
    <>
      <Header />
      <main id="task">
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone ? (
            <div className="list phone">{renderAllCards()}</div>
          ) : (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/2022 16:40 hs</h6>
                  <h5>Fidel Parabacuto</h5>
                  <button>Nueva</button>
                  <button>Alta</button>
                  <p>
                    {" "}
                    {
                      limitString(
                        "lorem Ips  but not consectetur adipiscing elit esse cillum d Pattern   sit amet, consectetur adipiscing elit esse neque sed diam non   proident  et dolore magna aliqu     sapien sed  diam non proident et dolore magna aliqu  sapien sed diam non proident et dolore magna aliqu sap penatibus et justo euismod tempor  invidunt ut lab et dolore magna aliqu   sapien sed diam non proident et dolore magna aliqu sap  "
                      ).string
                    }
                  </p>
                </div>
              </div>
              <div className="list">
                <h4>En proceso</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/2022 16:40 hs</h6>
                  <h5>Fidel Parabacuto</h5>
                  <button>Nueva</button>
                  <button>Alta</button>
                  <p>Descripción fake</p>
                </div>
              </div>
              <div className="list">
                <h4>Finalizado</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/2022 16:40 hs</h6>
                  <h5>Fidel Parabacuto</h5>
                  <button>Nueva</button>
                  <button>Alta</button>
                  <p>Descripción fake</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
export default Task;
