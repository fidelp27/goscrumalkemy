import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../auth.css";
import swal from "../../../../utils/swal";

const { REACT_APP_API_ENDPOINT } = process.env;

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    password: "",
  };

  const required = "* Campo obligatorio";
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Este campo admite mínimo 4 caracteres")
      .required(required),
    password: Yup.string().required(required),
  });

  const onSubmit = () => {
    const { userName, password } = values;
    fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("user", data?.result?.user.userName);
          navigate("/", { replace: true });
        } else {
          swal();
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && <div> {errors.userName}</div>}
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && <div> {errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <span>
            ¿No tienes cuenta? <Link to="/register">Registro</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
export default Login;
