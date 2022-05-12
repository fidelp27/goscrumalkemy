import React from "react";
import { useFormik } from "formik";

const Register = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = () => {
    alert();
  };

  const formik = useFormik({ initialValues, onSubmit });
  const { handleSubmit, handleChange, values, errors } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
      <div>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          value={values.userName}
          onChange={handleChange}
        />
        {errors.userName && <div> {errors.userName}</div>}
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
        <label htmlFor="username">Email</label>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <div> {errors.email}</div>}
      </div>
      <input
        type="hidden"
        name="teamID"
        value="9cdbd108-f924-947d-8f0c651d0dad"
      />
      <div>
        <label htmlFor="role">Rol</label>
        <select name="role" id="role">
          <option value="Team Member">Team Member</option>
          <option value="Team Leader">Team Leader</option>
        </select>
        {errors.role && <div> {errors.role}</div>}
      </div>
      <div>
        <label htmlFor="continent">Continente</label>
        <select name="continent" id="continent">
          <option value="America">America</option>
          <option value="Europa">Europa</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.continent && <div> {errors.continent}</div>}
      </div>
      <div>
        <label htmlFor="region">Region</label>
        <select name="region" id="region">
          <option value="Latam">Latam</option>
          <option value="Brasil">Brasil</option>
          <option value="America del Norte">America del Norte</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.region && <div> {errors.region}</div>}
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};
export default Register;
