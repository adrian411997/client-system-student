import React, { useState, useEffect } from "react";
import "./Login.css";

import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  //VARIABLES
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  //FUNCIONES
  const createUser = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/user", form);
      Swal.fire({ title: response.data.message, icon: response.data.result });
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: error.response.data.result,
      });
    }
  };
  const onchangetext = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const isLogged = localStorage.getItem("userCredentials");
    if (isLogged) {
      navigate("/students");
    }
  }, [navigate]);

  return (
    <div className="main-space">
      <div className="main-login">
        <div className="main-title">
          <h1>Bienvenido/a al la app para un seguimiento mas eficaz</h1>
          <h1>sobre tus alumnos</h1>
          <h1>Primero que nada, ingrese:</h1>
        </div>
        <div className="main-buttons">
          <input
            id="usuario"
            type="text"
            placeholder="Escriba aqui su nombre"
            name="nombre"
            onChange={onchangetext}
          />
          <input
            id="usuario"
            name="email"
            type="text"
            placeholder="Escriba aqui su email"
            onChange={onchangetext}
          />{" "}
          <input
            id="usuario"
            type="text"
            name="password"
            placeholder="Escriba aqui su contraseña"
            onChange={onchangetext}
          />
          <button onClick={createUser}>Registrarse </button>
          <Link to="/login">Ya tengo una cuenta</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
