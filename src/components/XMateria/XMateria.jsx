import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterias, listMateria } from "../../Redux/Reducers/Materia";
import "./XMateria.css";

const XMateria = () => {
  const dispatch = useDispatch();
  const materias = useSelector(listMateria);
  console.log(materias);
  useEffect(() => {
    dispatch(getMaterias());
  }, [dispatch]);
  return (
    <div className="xmateria-space">
      <div className="xmateria-container">
        <div className="xmateria-title">
          <h1>Notas por Materia</h1>
        </div>
      </div>
    </div>
  );
};

export default XMateria;
