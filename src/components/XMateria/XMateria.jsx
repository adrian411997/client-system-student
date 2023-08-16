import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterias,
  listMateria,
  postMateria,
} from "../../Redux/Reducers/Materia";
import { getAlumnos, listAlumno } from "../../Redux/Reducers/Alumnos";
import { getNotas, listNotas, postNotas } from "../../Redux/Reducers/Notas";
import "./XMateria.css";
import Modal from "../utilities/Modal";

const XMateria = () => {
  //VARIABLES

  const dispatch = useDispatch();
  const materias = useSelector(listMateria);
  const alumnos = useSelector(listAlumno);
  const notas = useSelector(listNotas);
  const [notasAgrupadas, setNotasAgrupadas] = useState([]);
  const [maxLengthPerMateria, setMaxLengthPerMateria] = useState({});
  const [form, setForm] = useState({
    idAlumno: 0,
    idMateria: 0,
    nota: 0,
    trim: 0,
  });
  const [materiaUp, setMateriaUp] = useState({ nombre: "" });

  //FUNCIONES

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeMateria = (e) => {
    setMateriaUp({ ...materiaUp, [e.target.name]: e.target.value });
  };

  const uploadNota = () => {
    dispatch(postNotas(form));
  };

  const uploadMateria = () => {
    dispatch(postMateria(materiaUp));
  };

  //RENDERIZADO

  useEffect(() => {
    dispatch(getMaterias());
    dispatch(
      getNotas(JSON.parse(localStorage.getItem("userCredentials")).user.id)
    );
    dispatch(
      getAlumnos(JSON.parse(localStorage.getItem("userCredentials")).user.id)
    );
  }, [dispatch]);

  useEffect(() => {
    if (notas !== undefined) {
      const notasAgrupadasTemp = {};
      const maxLengthPerMateriaTemp = {};

      if (notas.finds && notas.finds.length > 0) {
        notas.finds.forEach((nota) => {
          const clave = `${nota.alumno_nombre}-${nota.materia}`;
          if (!notasAgrupadasTemp[clave]) {
            notasAgrupadasTemp[clave] = {
              alumno_nombre: nota.alumno_nombre,
              apellido: nota.apellido,
              usuario_id: nota.usuario_id,
              materia: nota.materia,
              notas: [],
            };
          }
          notasAgrupadasTemp[clave].notas.push(nota.nota);

          if (!maxLengthPerMateriaTemp[nota.materia]) {
            maxLengthPerMateriaTemp[nota.materia] = 0;
          }
          if (
            notasAgrupadasTemp[clave].notas.length >
            maxLengthPerMateriaTemp[nota.materia]
          ) {
            maxLengthPerMateriaTemp[nota.materia] =
              notasAgrupadasTemp[clave].notas.length;
          }
        });

        Object.keys(notasAgrupadasTemp).forEach((clave) => {
          const alumnoNotas = notasAgrupadasTemp[clave].notas;
          const materia = notasAgrupadasTemp[clave].materia;
          const maxLengthForMateria = maxLengthPerMateriaTemp[materia];
          const cantidadFaltante = maxLengthForMateria - alumnoNotas.length;
          notasAgrupadasTemp[clave].notas = alumnoNotas.concat(
            Array(cantidadFaltante).fill(1)
          );
        });
      }

      const resultadoFinal = Object.values(notasAgrupadasTemp);
      setNotasAgrupadas(resultadoFinal);
      setMaxLengthPerMateria(maxLengthPerMateriaTemp);
    }
  }, [notas]);

  return (
    <div className="xmateria-space">
      <div className="xmateria-container">
        <div className="xmateria-title bg-primary py-3 text-light">
          <h1>Notas por Materia</h1>
        </div>
        <div className="xmateria-buttons mt-3">
          <button
            className="btn btn-success text-light"
            data-bs-toggle="modal"
            data-bs-target="#subirNota"
          >
            Subir nota
          </button>
          <Modal
            title="Subir nota"
            idModal="subirNota"
            functionButtonF={uploadNota}
          >
            <div className="modal-body">
              <div className="mb-3">
                <select
                  onChange={onChange}
                  name="idMateria"
                  className="form-select my-3"
                >
                  <option disabled selected value="">
                    Seleccione una materia
                  </option>
                  {materias.finds && materias.finds.length > 0
                    ? materias.finds.map((m, index) => (
                        <option value={m.id} key={index}>
                          {m.materia_nombre}
                        </option>
                      ))
                    : ""}
                </select>
                <select
                  onChange={onChange}
                  name="idAlumno"
                  className="form-select my-3"
                >
                  <option disabled selected value="">
                    Seleccione un alumno
                  </option>
                  {alumnos.finds && alumnos.finds.length > 0
                    ? alumnos.finds.map((a, index) => (
                        <option key={index} value={a.id}>
                          {a.alumno_nombre} {a.apellido}
                        </option>
                      ))
                    : ""}
                </select>
                <select
                  name="nota"
                  onChange={onChange}
                  className="form-select my-3"
                >
                  <option disabled selected value="">
                    Seleccion la nota
                  </option>{" "}
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    (number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    )
                  )}
                </select>{" "}
                <select
                  name="trim"
                  onChange={onChange}
                  className="form-select my-3"
                >
                  <option disabled selected value="">
                    Seleccion el trimestre
                  </option>{" "}
                  {Array.from({ length: 3 }, (_, index) => index + 1).map(
                    (number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </Modal>{" "}
          <button
            className="btn btn-success text-light"
            data-bs-toggle="modal"
            data-bs-target="#subirMateria"
          >
            Subir materia
          </button>
          <Modal
            title={"Subir materia"}
            idModal={"subirMateria"}
            functionButtonF={uploadMateria}
          >
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label" for="nameMateria">
                  Nombre de la materia:
                </label>
                <input
                  onChange={onChangeMateria}
                  type="text"
                  className="form-control"
                  name="nombre"
                />
              </div>
            </div>
          </Modal>
        </div>
        <div className="xmateria-list my-4">
          {materias === undefined
            ? "Cargando..."
            : materias.finds && materias.finds.length > 0
            ? materias.finds.map((m, index) => (
                <div className="xmateria-indi" key={index}>
                  <h1>{m.materia_nombre}</h1>
                  <table className="table my-3">
                    <thead>
                      <tr className="text-center">
                        <th className="col-1">Nº</th>
                        <th className="col-3">Alumno</th>
                        <th
                          colSpan={maxLengthPerMateria[m.materia_nombre]}
                          className="text-center"
                        >
                          Notas
                        </th>
                        <th>Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notasAgrupadas
                        .filter((n) => n.materia === m.materia_nombre)
                        .map((r, index) => (
                          <tr key={index} className="text-center">
                            <td>{index + 1}</td>
                            <td>
                              {r.alumno_nombre} {r.apellido}
                            </td>
                            {r.notas.map((n, index) => (
                              <td key={index}>{n}</td>
                            ))}
                            <td
                              className={
                                r.notas.reduce((sum, nota) => sum + nota, 0) /
                                  r.notas.length >
                                8
                                  ? "bg-success"
                                  : r.notas.reduce(
                                      (sum, nota) => sum + nota,
                                      0
                                    ) /
                                      r.notas.length >
                                    5
                                  ? "bg-warning"
                                  : r.notas.reduce(
                                      (sum, nota) => sum + nota,
                                      0
                                    ) /
                                      r.notas.length >
                                    3
                                  ? "bg-danger"
                                  : "bg-dark text-light"
                              }
                            >
                              {r.notas.reduce((sum, nota) => sum + nota, 0) /
                                r.notas.length}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))
            : "Cargando..."}
        </div>
      </div>
    </div>
  );
};

export default XMateria;
