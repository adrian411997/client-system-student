import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterias,
  listMateria,
  postMateria,
} from "../../Redux/Reducers/Materia";
import { getAlumnos, listAlumno } from "../../Redux/Reducers/Alumnos";
import { getNotas, listNotas } from "../../Redux/Reducers/Notas";
import "./Trimestres.css";

const Trimestres = () => {
  const dispatch = useDispatch();
  const [notasAgrupadas, setNotasAgrupadas] = useState([]);
  const [maxLengthPerMateria, setMaxLengthPerMateria] = useState({});
  const notas = useSelector(listNotas);
  const materias = useSelector(listMateria);
  const alumnos = useSelector(listAlumno);

  useEffect(() => {
    dispatch(
      getNotas(JSON.parse(localStorage.getItem("userCredentials")).user.id)
    );
    dispatch(getMaterias());
    dispatch(
      getAlumnos(JSON.parse(localStorage.getItem("userCredentials")).user.id)
    );
  }, [dispatch]);
  useEffect(() => {
    if (notas !== undefined) {
      const notasAgrupadasTemp = {};
      const maxLengthPerMateriaTemp = {};
      const notasPorMateriaYTrimestre = {};

      if (notas.finds && notas.finds.length > 0) {
        notas.finds.forEach((nota) => {
          const clave = `${nota.alumno_nombre}-${nota.materia}-${nota.trimestre}`;

          if (!notasAgrupadasTemp[clave]) {
            notasAgrupadasTemp[clave] = {
              alumno_nombre: nota.alumno_nombre,
              apellido: nota.apellido,
              usuario_id: nota.usuario_id,
              materia: nota.materia,
              trimestre: nota.trimestre,
              notas: 0, // Inicializamos con 0
              cantidadNotas: 0, // Contador para el promedio
            };
          }

          notasAgrupadasTemp[clave].notas += nota.nota;
          notasAgrupadasTemp[clave].cantidadNotas += 1;

          if (!maxLengthPerMateriaTemp[nota.materia]) {
            maxLengthPerMateriaTemp[nota.materia] = {};
          }

          if (
            !maxLengthPerMateriaTemp[nota.materia][nota.trimestre] ||
            notasAgrupadasTemp[clave].cantidadNotas >
              maxLengthPerMateriaTemp[nota.materia][nota.trimestre]
          ) {
            maxLengthPerMateriaTemp[nota.materia][nota.trimestre] =
              notasAgrupadasTemp[clave].cantidadNotas;
          }

          if (!notasPorMateriaYTrimestre[nota.materia]) {
            notasPorMateriaYTrimestre[nota.materia] = {};
          }

          if (!notasPorMateriaYTrimestre[nota.materia][nota.trimestre]) {
            notasPorMateriaYTrimestre[nota.materia][nota.trimestre] = [];
          }

          notasPorMateriaYTrimestre[nota.materia][nota.trimestre].push(
            nota.nota
          );
        });

        Object.keys(notasAgrupadasTemp).forEach((clave) => {
          console.log(notasAgrupadasTemp[clave]);
          if (
            notasAgrupadasTemp[clave].cantidadNotas <
            maxLengthPerMateriaTemp[notasAgrupadasTemp[clave].materia][
              notasAgrupadasTemp[clave].trimestre
            ]
          ) {
            notasAgrupadasTemp[clave].notas +=
              maxLengthPerMateriaTemp[notasAgrupadasTemp[clave].materia][
                notasAgrupadasTemp[clave].trimestre +
                  notasAgrupadasTemp[clave].cantidadNotas
              ];
          }
          const promedio =
            notasAgrupadasTemp[clave].notas /
            maxLengthPerMateriaTemp[notasAgrupadasTemp[clave].materia][
              notasAgrupadasTemp[clave].trimestre
            ];

          notasAgrupadasTemp[clave].notas = promedio;
        });
      }

      const resultadoFinal = Object.values(notasAgrupadasTemp);
      setNotasAgrupadas(resultadoFinal);
      setMaxLengthPerMateria(maxLengthPerMateriaTemp);
    }
  }, [notas]);
  console.log(notasAgrupadas);
  return (
    <div className="trimestre-space">
      <div className="trimestre-container">
        <div className="trimestre-title bg-primary py-3 text-light">
          <h1>Notas por trimestre</h1>
        </div>
        <div className="trimestre-list">
          <div className="t1 my-4">
            <h1>Trimestre 1</h1>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Alumnos</th>
                {materias === undefined
                  ? "cargando..."
                  : materias.finds && materias.finds.length > 0
                  ? materias.finds.map((m, index) => (
                      <th key={index}>{m.materia_nombre}</th>
                    ))
                  : ""}

                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {alumnos !== undefined
                ? alumnos.finds && alumnos.finds.length > 0
                  ? alumnos.finds.map((a, index) => {
                      const notasAlumno = notasAgrupadas
                        .filter(
                          (n) =>
                            n.alumno_nombre === a.alumno_nombre &&
                            n.trimestre === 1
                        )
                        .sort((a, b) => a.materia.localeCompare(b.materia));

                      const promedioNotasAlumno =
                        notasAlumno.length > 0
                          ? notasAlumno.reduce(
                              (total, nota) => total + nota.notas,
                              0
                            ) / materias.finds.length
                          : 1;

                      return (
                        <tr key={index}>
                          <td>
                            {a.alumno_nombre} {a.apellido}
                          </td>
                          {materias.finds.map((materia, index) => {
                            const notaMateria = notasAlumno.find(
                              (n) => n.materia === materia.materia_nombre
                            );

                            const valorCelda = notaMateria
                              ? notaMateria.notas
                              : 1;

                            return <td key={index}>{valorCelda}</td>;
                          })}
                          <td>{promedioNotasAlumno}</td>
                        </tr>
                      );
                    })
                  : ""
                : ""}
            </tbody>
          </table>
          <div className="t2 my-4">
            <h1>Trimestre 2</h1>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Alumnos</th>
                {materias === undefined
                  ? "cargando..."
                  : materias.finds && materias.finds.length > 0
                  ? [...materias.finds] // Crear una copia del array
                      .sort((a, b) =>
                        a.materia_nombre.localeCompare(b.materia_nombre)
                      ) // Ordenar alfabéticamente por nombre de materia
                      .map((m, index) => (
                        <th key={index}>{m.materia_nombre}</th>
                      ))
                  : ""}

                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {alumnos !== undefined
                ? alumnos.finds && alumnos.finds.length > 0
                  ? alumnos.finds.map((a, index) => {
                      const notasAlumno = notasAgrupadas.filter(
                        (n) =>
                          n.alumno_nombre === a.alumno_nombre &&
                          n.trimestre === 2
                      );

                      const promedioNotasAlumno =
                        notasAlumno.length > 0
                          ? notasAlumno.reduce(
                              (total, nota) => total + nota.notas,
                              0
                            ) / materias.finds.length
                          : 1;

                      return (
                        <tr key={index}>
                          <td>
                            {a.alumno_nombre} {a.apellido}
                          </td>
                          {materias.finds.map((materia, index) => {
                            const notaMateria = notasAlumno.find(
                              (n) => n.materia === materia.materia_nombre
                            );

                            const valorCelda = notaMateria
                              ? notaMateria.notas
                              : 1;

                            return <td key={index}>{valorCelda}</td>;
                          })}
                          <td>{promedioNotasAlumno}</td>
                        </tr>
                      );
                    })
                  : ""
                : ""}
            </tbody>
          </table>{" "}
          <div className="t3 my-4">
            <h1>Trimestre 3</h1>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Alumnos</th>
                {materias === undefined
                  ? "cargando..."
                  : materias.finds && materias.finds.length > 0
                  ? [...materias.finds] // Crear una copia del array
                      .sort((a, b) =>
                        a.materia_nombre.localeCompare(b.materia_nombre)
                      ) // Ordenar alfabéticamente por nombre de materia
                      .map((m, index) => (
                        <th key={index}>{m.materia_nombre}</th>
                      ))
                  : ""}

                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {alumnos !== undefined
                ? alumnos.finds && alumnos.finds.length > 0
                  ? alumnos.finds.map((a, index) => {
                      const notasAlumno = notasAgrupadas.filter(
                        (n) =>
                          n.alumno_nombre === a.alumno_nombre &&
                          n.trimestre === 3
                      );

                      const promedioNotasAlumno =
                        notasAlumno.length > 0
                          ? notasAlumno.reduce(
                              (total, nota) => total + nota.notas,
                              0
                            ) / materias.finds.length
                          : 1;

                      return (
                        <tr key={index}>
                          <td>
                            {a.alumno_nombre} {a.apellido}
                          </td>
                          {materias.finds.map((materia, index) => {
                            const notaMateria = notasAlumno.find(
                              (n) => n.materia === materia.materia_nombre
                            );

                            const valorCelda = notaMateria
                              ? notaMateria.notas
                              : 1;

                            return <td key={index}>{valorCelda}</td>;
                          })}
                          <td>{promedioNotasAlumno}</td>
                        </tr>
                      );
                    })
                  : ""
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trimestres;
