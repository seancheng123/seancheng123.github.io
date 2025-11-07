import { useState, useEffect } from 'react';
import "./PageLoaderWrapper.css"
import { useLocation } from 'react-router-dom';
import rest from "../../assets/rest.png";
import fermata from "../../assets/fermata.png";

export default function PageLoaderWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading ? 
        <LoadingScreen /> 
        :
        children
      }
    </>
  );
}

function LoadingScreen() {
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
