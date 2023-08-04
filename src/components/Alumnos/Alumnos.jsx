import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postAlumnos,
  getAlumnos,
  listAlumno,
} from "../../Redux/Reducers/Alumnos";
import "./Alumnos.css";
import Swal from "sweetalert2";

const Alumnos = () => {
  const credentials = JSON.parse(localStorage.getItem("userCredentials"));
  const myAlumnos = useSelector(listAlumno);

  console.log(myAlumnos);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    user_id: credentials.user.id,
  });

  const dispatch = useDispatch();
  const onchangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const addAlumno = () => {
    dispatch(postAlumnos(form));
    Swal.fire({ title: "Alumno registrado con exito", icon: "success" });
  };
  useEffect(() => {
    dispatch(
      getAlumnos(JSON.parse(localStorage.getItem("userCredentials")).user.id)
    );
  }, []);
  return (
    <div className="alumnos-space">
      <div className="alumnos-container">
        <div className="alumnos-title">
          <h1>Alumnos</h1>
        </div>
        <div className="alumnos-button">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-success"
          >
            Agregar Alumnos
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Agregar Alumno
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Nombre del alumno
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="nombre"
                      onChange={onchangeText}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">
                      Apellido del alumno
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="apellido"
                      onChange={onchangeText}
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={addAlumno}
                    type="button"
                    class="btn btn-success"
                    data-bs-dismiss="modal"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="alumnos-table w-100">
          <table className="table my-3">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre</th>
                <th>Apellido</th>
              </tr>
            </thead>
            <tbody>
              {myAlumnos.finds === undefined
                ? "No hay alumnos"
                : myAlumnos.finds.length > 0
                ? myAlumnos.finds.map((b, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{b.alumno_nombre}</td>
                      <td>{b.apellido}</td>
                    </tr>
                  ))
                : "No hay alumnos"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alumnos;
