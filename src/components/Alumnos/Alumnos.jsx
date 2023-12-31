import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postAlumnos,
  getAlumnos,
  listAlumno,
  deleteAlumnos,
  editAlumnos,
} from "../../Redux/Reducers/Alumnos";
import "./Alumnos.css";
import Swal from "sweetalert2";
import Modal from "../utilities/Modal";

const Alumnos = () => {
  //VARIABLES

  const credentials = JSON.parse(localStorage.getItem("userCredentials"));
  const myAlumnos = useSelector(listAlumno);
  const [editForm, setEditForm] = useState({ nombre: "", apellido: "" });
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    user_id: credentials.user.id,
  });

  //FUNCIONES

  const onChangeEditForm = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const sendEdit = async (id) => {
    try {
      await dispatch(editAlumnos({ id, ...editForm }));

      Swal.fire({ title: "Alumno editado con exito", icon: "success" }).then(
        () => {
          window.location.reload();
          setEditForm({ id: null, nombre: "", apellido: "" });
        }
      );
    } catch (error) {
      Swal.fire({ title: "Error al editar alumno", icon: "error" });
    }
  };
  const eraseAlumno = (id) => {
    dispatch(deleteAlumnos(id));
    Swal.fire({ title: "Alumno editado con exito", icon: "success" }).then(
      () => {
        window.location.reload();
      }
    );
  };
  const dispatch = useDispatch();
  const onchangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const addAlumno = () => {
    dispatch(postAlumnos(form));
    Swal.fire({ title: "Alumno registrado con exito", icon: "success" }).then(
      () => {
        window.location.reload();
      }
    );
  };

  //RENDERIZADO

  useEffect(() => {
    dispatch(
      getAlumnos(JSON.parse(localStorage.getItem("userCredentials")).user.id)
    );
  }, [dispatch]);

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
          <Modal
            title="Agregar Alumnos"
            idModal="exampleModal"
            functionButtonF={addAlumno}
          >
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Nombre del alumno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="nombre"
                  onChange={onchangeText}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Apellido del alumno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="apellido"
                  onChange={onchangeText}
                />
              </div>
            </div>
          </Modal>
        </div>
        <div className="alumnos-table w-100">
          <table className="table my-3">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th colSpan={1}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {myAlumnos === undefined
                ? "Cargando alumnos..."
                : myAlumnos.finds && myAlumnos.finds.length > 0
                ? myAlumnos.finds.map((b, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{b.alumno_nombre}</td>
                      <td>{b.apellido}</td>
                      <td>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target={`#editarAlumno${b.id}`}
                          className="btn btn-warning mx-2"
                        >
                          <svg
                            version="1.1"
                            width="20px"
                            height="20px"
                            viewBox="0 0 128 128"
                            enableBackground="new 0 0 128 128"
                            fill="#ffff"
                          >
                            <g>
                              <g>
                                <path d="M8,112V16c0-4.414,3.594-8,8-8h80c4.414,0,8,3.586,8,8v47.031l8-8V16c0-8.836-7.164-16-16-16H16C7.164,0,0,7.164,0,16v96    c0,8.836,7.164,16,16,16h44v-8H16C11.594,120,8,116.414,8,112z M88,24H24v8h64V24z M88,40H24v8h64V40z M88,56H24v8h64V56z M24,80    h32v-8H24V80z M125.656,72L120,66.344c-1.563-1.563-3.609-2.344-5.656-2.344s-4.094,0.781-5.656,2.344l-34.344,34.344    C72.781,102.25,68,108.293,68,110.34L64,128l17.656-4c0,0,8.094-4.781,9.656-6.344l34.344-34.344    C128.781,80.188,128.781,75.121,125.656,72z M88.492,114.82c-0.453,0.43-2.02,1.488-3.934,2.707l-10.363-10.363    c1.063-1.457,2.246-2.922,2.977-3.648l25.859-25.859l11.313,11.313L88.492,114.82z" />
                              </g>
                            </g>
                          </svg>
                        </button>
                        <Modal
                          title={"Editar datos"}
                          idModal={`editarAlumno${b.id}`}
                          functionButtonF={() => sendEdit(b.id)}
                        >
                          <div className="modal-body">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Nombre del alumno
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                name="nombre"
                                placeholder={b.alumno_nombre}
                                onChange={onChangeEditForm}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Apellido del alumno
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                name="apellido"
                                placeholder={b.apellido}
                                onChange={onChangeEditForm}
                              />
                            </div>
                          </div>
                        </Modal>
                        <button
                          onClick={() => eraseAlumno(b.id)}
                          className="btn btn-danger"
                        >
                          <svg
                            viewBox="0 0 50 50"
                            width="20px"
                            height="20px"
                            fill="#ffff"
                          >
                            <path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z" />
                          </svg>
                        </button>
                      </td>
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
