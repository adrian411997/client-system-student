import "./main.css";
import Lateral from "./LateralBar/lateral";
import Login from "./Login/Login";

const Main = () => {
  return (
    <div className="container-g">
      <Lateral />
      <Login />
    </div>
  );
};

export default Main;
