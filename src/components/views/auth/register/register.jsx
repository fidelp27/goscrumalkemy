import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../auth.css";

const { REACT_APP_API_ENDPOINT } = process.env;

const Register = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  console.log(data);
  useEffect(() => {
    fetch(`{REACT_APP_API_ENDPOINT}auth/data`)
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((data) => setData(data.result));
  }, []);

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const required = "* Campo obligatorio";
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Este campo admite mínimo 4 caracteres")
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string().email("Debe ser un email válido").required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") {
      setFieldValue("region", "Otro");
    }
  };

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID: teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        navigate("/registered/" + data?.result.user?.teamID, { replace: true })
      );
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
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
          <label htmlFor="username">Email</label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && <div> {errors.email}</div>}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="secondary"
            />
          }
          label="Perteneces a un equipo ya creado"
        />
        {values.switch && (
          <div>
            <label>Por favor introduce el identificador de equipo</label>
            <input
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label htmlFor="role">Rol</label>
          <select
            name="role"
            id="role"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">Selecciona un rol</option>
            {React.Children.toArray(
              data?.Rol.map((opcion) => (
                <option value={opcion}>{opcion} </option>
              ))
            )}
          </select>
          {errors.role && touched.role && <div> {errors.role}</div>}
        </div>
        <div>
          <label htmlFor="continent">Continente</label>
          <select
            name="continent"
            id="continent"
            onBlur={handleBlur}
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Selecciona un continente</option>
            {React.Children.toArray(
              data?.continente.map((opcion) => (
                <option value={opcion}>{opcion} </option>
              ))
            )}
          </select>
          {errors.continent && touched.continent && (
            <div> {errors.continent}</div>
          )}
        </div>
        {values.continent === "America" && (
          <div>
            <label htmlFor="region">Region</label>
            <select
              name="region"
              id="region"
              onBlur={handleBlur}
              onChange={handleChange}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Selecciona una región</option>
              {React.Children.toArray(
                data?.region.map((opcion) => (
                  <option value={opcion}>{opcion} </option>
                ))
              )}
            </select>
            {errors.region && touched.region && <div> {errors.region}</div>}
          </div>
        )}
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <span>
            ¿Ya tienes una cuenta? <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
export default Register;
