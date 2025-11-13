import "./LoadingScreen.css";
import rest from "../../assets/rest.png";
import fermata from "../../assets/fermata.png";


export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="scaling-container">
        <div className="loading-icons">
          <div className="circle"/>
          <img src={fermata} alt="fermata" className="fermata"/>
          <img src={rest} alt="rest" className="rest"/>
        </div>
      </div>
    </div>
  );
}