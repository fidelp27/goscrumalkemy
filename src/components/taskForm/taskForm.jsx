import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./taskForm.styled.css";

const { REACT_APP_API_ENDPOINT } = process.env;

const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, " La cantidad mínima es 6 caracteres")
      .required(required),
    status: Yup.string().required(required),
    description: Yup.string().required(required),
    importance: Yup.string().required(required),
  });

  const onSubmit = () => {
    fetch(`${REACT_APP_API_ENDPOINT}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        task: values,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resetForm();
        toast.success("🦄 Tarea creada", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    resetForm,
  } = formik;

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
            value={values.title}
          />{" "}
          {errors.title && touched.title && (
            <div className="error-message"> {errors.title}</div>
          )}
        </div>
        <div>
          <select
            name="status"
            onChange={handleChange}
            className={errors.status && touched.status ? "error" : ""}
            value={values.status}
          >
            <option value="">Seleccionar un estado</option>
            <option value="NEW">Nueva</option>
            <option value="IN PROGRESS">En proceso</option>
            <option value="FINISHED">Terminada</option>
          </select>
          {errors.status && touched.status && (
            <div className="error-message"> {errors.status}</div>
          )}
        </div>
        <div>
          <select
            name="importance"
            onChange={handleChange}
            className={errors.importance && touched.importance ? "error" : ""}
            value={values.importance}
          >
            <option value="">Seleccionar una prioridad</option>
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
          {errors.importance && touched.importance && (
            <div className="error-message"> {errors.importance}</div>
          )}
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Descripción"
            className={errors.description && touched.description ? "error" : ""}
            value={values.description}
          ></textarea>
          {errors.description && touched.description && (
            <div className="error-message"> {errors.description}</div>
          )}
        </div>
        <button type="submit">Crear</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />{" "}
    </section>
  );
};
export default TaskForm;
