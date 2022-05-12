import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "El email es requerido";
    }
    if (!values.password) {
      errors.password = "El password es requerido";
    }
    return errors;
  };

  const onSubmit = () => {
    localStorage.setItem("logged", "yes");
    navigate("/", { replace: true });
  };

  const formik = useFormik({ initialValues, validate, onSubmit });
  const { handleSubmit, handleChange, values, errors } = formik;
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div> {errors.email}</div>}
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <div> {errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
