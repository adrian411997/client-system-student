import "./main.css";
import Lateral from "./LateralBar/lateral";
import Login from "./Login/Login";
import Login2 from "./Login2/Login2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alumnos from "./Alumnos/Alumnos";
import Ajustes from "./Ajustes/Ajustes";
import XMateria from "./XMateria/XMateria";
import Trimestres from "./Trimestres/Trimestres";
const Main = () => {
  return (
    <Router>
      <div className="container-g">
        <Lateral />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login2 />}></Route>
          <Route path="/students" element={<Alumnos />}></Route>
          <Route path="/configuration" element={<Ajustes />}></Route>
          <Route path="/notas">
            <Route path="/notas/materia" element={<XMateria />}></Route>
            <Route path="/notas/trimestrales" element={<Trimestres />}></Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
