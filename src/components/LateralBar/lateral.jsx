import "./Lateral.css";
import { botones } from "../data/datos";

const Lateral = () => {
  return (
    <div className="lateral-space">
      <div className="button-container">
        {botones.map((b, index) => (
          <div className="button-false" key={index}>
            <img src={b.image} width={100} alt={b.title} />
            <h2>{b.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lateral;
