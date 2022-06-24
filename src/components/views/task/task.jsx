import React, { useEffect, useState } from "react";
import Header from "../../header/header";
import "./task.css";
import { useResize } from "../../../hooks/useResize";
import { Card } from "../../card/card";
import TaskForm from "../../taskForm/taskForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import debounce from "lodash/debounce";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  deleteTask,
  editTaskStatus,
} from "../../../store/actions/taskActions";

const Task = () => {
  const { isPhone } = useResize();
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [taskFromWho, setTaskFromWho] = useState("ALL");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    dispatch(getTasks(taskFromWho === "ME" ? "me" : ""));
  }, [taskFromWho, dispatch]);

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (search) {
      // filtra el titulo que comience por el valor buscado "startsWith"
      setRenderList(
        list.filter((data) =>
          data.title.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    } else {
      setRenderList(list);
    }
  }, [search, list]);

  const renderAllCards = () => {
    return renderList?.map((elem) => (
      <Card
        key={elem._id}
        data={elem}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
      />
    ));
  };
  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((elem) => (
        <Card
          key={elem._id}
          data={elem}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ));
  };
  renderColumnCards();

  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL" || event.currentTarget.value === "")
      setRenderList(list);
    else
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
  };
  // Debounce retrasa la ejecución en el tiempo indicado (1s). Evita que cambie el estado por cada tecla que presionamos
  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);

  const handleDelete = (id) => dispatch(deleteTask(id));

  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data));

  if (error) return <div>Hay un error</div>;

  return (
    <>
      <Header />
      <main id="task">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-button-group-label"
                onChange={(evt) => {
                  setTaskFromWho(evt.currentTarget.value);
                }}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis Tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por título..."
                onChange={handleSearch}
              />
            </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="">Seleccionar una prioridad</option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {isPhone ? (
            !tasks.length ? (
              <div>No hay tareas creadas</div>
            ) : loading ? (
              <Skeleton />
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!tasks.length ? (
                <div>No hay tareas creadas</div>
              ) : loading ? (
                <Skeleton height={90} />
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En proceso</h4>
                    {renderColumnCards("IN PROGRESS")}{" "}
                  </div>
                  <div className="list">
                    <h4>Finalizado</h4>
                    {renderColumnCards("FINISHED")}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
export default Task;
