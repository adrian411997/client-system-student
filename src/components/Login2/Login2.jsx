import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, credentials } from "../../Redux/Reducers/Usuario";
import Swal from "sweetalert2";

const Login2 = () => {
  const navigate = useNavigate();
  const myCredentials = useSelector(credentials);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ nombre: "", password: "" });

  const onchangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buttonLogin = () => {
    dispatch(login(form));
  };

  useEffect(() => {
    if (myCredentials.message && myCredentials.result) {
      Swal.fire({
        text: myCredentials.message,
        icon: myCredentials.result,
      }).then(() => {
        if (myCredentials.result === "error") {
          window.location.reload();
        } else {
          navigate("/students");
        }
      });
    }
  }, [myCredentials]);

  return (
    <div className="main-space">
      <div className="main-login">
        <div className="main-title">
          <h1>Ingreses datos</h1>
        </div>
        <div className="main-buttons">
          <input
            id="usuario"
            type="text"
            name="nombre"
            placeholder="Escriba aqui su nombre"
            onChange={onchangeText}
          />
          <input
            onChange={onchangeText}
            name="password"
            id="usuario"
            type="text"
            placeholder="Escriba aqui la contraseña"
          />
          <button onClick={buttonLogin}>Iniciar Sesion</button>
        </div>
      </div>
    </div>
  );
};

export default Login2;
