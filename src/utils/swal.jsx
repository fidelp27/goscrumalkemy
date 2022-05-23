import Swal from "sweetalert2";

const swal = () => {
  return Swal.fire({
    title: "Error!",
    text: "Datos incorrectos",
    confirmButtonText: "Aceptar",
    width: "400px",
    timer: "5000",
    timerProgressBar: "true",
  });
};
export default swal;
