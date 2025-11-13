import { useState, useEffect } from 'react';
import "./PageLoaderWrapper.css"
import { useLocation } from 'react-router-dom';
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

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
