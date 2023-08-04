import React, { useState } from "react";
import "./Lateral.css";
import { botones, notasButtons } from "../data/datos";
import { Link, useNavigate } from "react-router-dom";
import left from "../assets/left.png";
import notas from "../assets/boleta-de-calificaciones.png";
const Lateral = () => {
  const navigate = useNavigate();
  const [showButtonsNotas, setShowButtonsNotas] = useState(false);
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
  console.log(showButtonsNotas);
  return (
    <div className="lateral-space">
      {" "}
      {showButtonsNotas ? (
        <div className="button-container">
          <div className="links-buttons" onClick={backButton}>
            <div className="button-false">
              <img src={left} alt="back" width={50} />
              <h2 className="title-button">Volver</h2>
            </div>
          </div>
          {notasButtons.map((b, index) => (
            <Link to={b.toURL} className="links-buttons" key={index}>
              <div className="button-false">
                <img src={b.image} width={50} alt={b.title} />
                <h2 className="title-button">{b.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="button-container">
          {botones.map((b, index) => (
            <Link className="links-buttons" to={b.toURL} key={index}>
              <div className="button-false">
                <img src={b.image} width={50} alt={b.title} />
                <h2 className="title-button">{b.title}</h2>
              </div>
            </Link>
          ))}{" "}
          <Link to="notas" className="links-buttons">
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
