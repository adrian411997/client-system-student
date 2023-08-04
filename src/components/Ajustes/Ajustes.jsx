import React, { useState } from "react";
import { logOut } from "../../Redux/Reducers/Usuario";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Ajustes.css";
const Ajustes = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const credentials = JSON.parse(localStorage.getItem("userCredentials"));
  const [nombre, setNombre] = useState(false);
  const [password, setPassword] = useState(false);
  const [mostrar, setMostrar] = useState("password");
  const [inputValue, setInputValue] = useState({
    nombre: credentials.user.usuario_nombre,
    password: credentials.user.password,
  });
  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const changeNombreState = () => {
    if (!nombre) {
      setNombre(true);
    } else {
      setInputValue({ nombre: credentials.user.usuario_nombre });
      setNombre(false);
    }
  };
  const changePasswordState = () => {
    if (!password) {
      setPassword(true);
    } else {
      setPassword(false);
    }
  };
  const changeShow = () => {
    if (mostrar === "password") {
      setMostrar("text");
    } else {
      setMostrar("password");
    }
  };
  const logout = () => {
    dispatch(logOut());
    Swal.fire({ text: "Cerro sesión con éxito", icon: "success" }).then(
      navigator("/")
    );
  };
  return (
    <div className="ajustes-space">
      <div className="ajustes-container">
        <div className="ajustes-title">
          <h1>Ajustes</h1>
        </div>
        <div className="ajustes-options">
          <div className="options">
            <label>Nombre de usuario</label>
            <input
              type="text"
              disabled={!nombre}
              value={inputValue.nombre}
              name="nombre"
              onChange={handleInputChange}
            />
            <div className="options-buttons mt-3">
              {!nombre ? (
                <button className="btn btn-warning" onClick={changeNombreState}>
                  Cambiar Nombre
                </button>
              ) : (
                <button className="btn btn-success">Enviar Modificacion</button>
              )}

              {nombre === true ? (
                <button
                  onClick={changeNombreState}
                  className="btn btn-danger mx-2"
                >
                  Cancelar
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="options">
            <label>Email</label>
            <input type="email" disabled value={credentials.user.email} />
          </div>
          <div className="options">
            <label>Contraseña</label>
            <div className="password-field">
              <input
                type={mostrar}
                disabled={!password}
                value={credentials.user.password}
                onChange={handleInputChange}
              />
              <button className="btn btn-primary mx-2" onClick={changeShow}>
                {mostrar === "password"
                  ? " Mostrar Contraseña"
                  : " Ocultar Contraseña"}
              </button>
            </div>
            <div className="options-buttons my-2">
              {!password ? (
                <button
                  className="btn btn-warning"
                  onClick={changePasswordState}
                >
                  Cambiar Contraseña
                </button>
              ) : (
                <button className="btn btn-success">Enviar Modificacion</button>
              )}

              {password === true ? (
                <button
                  className="btn btn-danger mx-2"
                  onClick={changePasswordState}
                >
                  Cancelar
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="options-button-close">
              <button className="btn btn-danger my-2" onClick={logout}>
                Cerra sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajustes;
