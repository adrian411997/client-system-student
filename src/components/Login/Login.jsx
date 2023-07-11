import { useState, useEffect } from "react";

import "./Login.css";
const Login = () => {
  const login = () => {};
  return (
    <div className="main-space">
      <div className="main-login">
        <div className="main-title">
          <h1>Bienvenido/a al la app para un seguimiento mas eficaz</h1>
          <h1>sobre tus alumnos</h1>
          <h1>Primero que nada, ingrese su nombre</h1>
        </div>
        <div className="main-buttons">
          <input
            id="usuario"
            type="text"
            placeholder="Escriba aqui su nombre"
          />
          <button>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
