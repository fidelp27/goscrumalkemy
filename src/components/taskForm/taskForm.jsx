import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./taskForm.styled.css";

const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    priority: "",
    description: "",
  };

  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, " La cantidad mínima es 6 caracteres")
      .required(required),
    status: Yup.string().required(required),
    priority: Yup.string().required(required),
  });

  const onSubmit = () => {
    alert();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;

  return (
    <section className="taskForm">
      {" "}
      <h2>Crear Tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Título"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.title ? "error" : ""}
          />{" "}
          {errors.title && touched.title && (
            <div className="error-message"> {errors.title}</div>
          )}
        </div>
        <div>
          <select
            name="status"
            onChange={handleChange}
            className={errors.status ? "error" : ""}
          >
            <option value="">Seleccionar un estado</option>
            <option value="new">Nueva</option>
            <option value="inProcess">En proceso</option>
            <option value="finished">Terminada</option>
          </select>
          {errors.status && touched.status && (
            <div className="error-message"> {errors.status}</div>
          )}
        </div>
        <div>
          <select
            name="priority"
            onChange={handleChange}
            className={errors.priority ? "error" : ""}
          >
            <option value="">Seleccionar una prioridad</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          {errors.priority && touched.priority && (
            <div className="error-message"> {errors.priority}</div>
          )}
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripción"
          ></textarea>
        </div>
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};
export default TaskForm;
