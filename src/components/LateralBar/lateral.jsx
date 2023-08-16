import React, { useState } from "react";
import "./Lateral.css";
import { botones, notasButtons } from "../data/datos";
import { Link, useNavigate, useLocation } from "react-router-dom";
import left from "../assets/left.png";
import notas from "../assets/boleta-de-calificaciones.png";
const Lateral = () => {
  //VARIABLES
  const navigate = useNavigate();
  const [showButtonsNotas, setShowButtonsNotas] = useState(false);

  //FUNCIONES
  const handleActive = (e) => {
    let buttons = document.getElementsByClassName("linking");

    Array.from(buttons).forEach((boton) => {
      // Quita la clase "activo" de cualquier otro botón que la tenga
      boton.classList.remove("activo");
    });
    e.target.classList.add("activo");
    console.log(e.target);
  };
  const changeButtonsNotas = () => {
    if (showButtonsNotas) {
      setShowButtonsNotas(false);
    } else {
      setShowButtonsNotas(true);
    }
  };
  const backButton = () => {
    setShowButtonsNotas(false);
    navigate("students");
  };

  return (
    <div className="lateral-space">
      {showButtonsNotas ? (
        <div className="button-container">
          <div className="links-buttons" onClick={backButton}>
            <div className="button-false ">
              <img src={left} alt="back" width={50} />
              <h2 className="title-button">Volver</h2>
            </div>
          </div>
          {notasButtons.map((b, index) => (
            <Link
              to={b.toURL}
              onClick={handleActive}
              className="links-buttons "
              key={index}
            >
              <div className="button-false linking">
                <img src={b.image} width={50} alt={b.title} />
                <h2 className="title-button">{b.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="button-container">
          {botones.map((b, index) => (
            <Link
              onClick={handleActive}
              className="links-buttons"
              to={b.toURL}
              key={index}
            >
              <div className="button-false linking">
                <img src={b.image} width={50} alt={b.title} />
                <h2 className="title-button">{b.title}</h2>
              </div>
            </Link>
          ))}{" "}
          <Link to="notas/materia" className="links-buttons">
            <div className="button-false" onClick={changeButtonsNotas}>
              <img src={notas} alt="notas" width={50} />
              <h2 className="title-button">Notas</h2>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Lateral;
