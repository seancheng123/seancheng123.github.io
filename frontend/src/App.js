import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavBar from "./components/NavBar/NavBar";
import NavScreen from "./components/NavScreen/NavScreen";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Notes from "./pages/Notes/Notes";
import Posts from "./pages/Posts/Posts";
import Repertoire from "./pages/Repertoire/Repertoire";
import Postlude from "./pages/Postlude/Postlude";


function App() {
  let [navScreenOpen, setNavScreenOpen] = useState(false);

  useEffect(() => {
    if (navScreenOpen) 
      document.body.style.overflow = 'hidden';
    else 
      document.body.style.overflow = '';
  }, [navScreenOpen]);

  return (
    <Router>
      <NavBar toggleOpen={() => setNavScreenOpen(!navScreenOpen)}/>
      <NavScreen isOpen={navScreenOpen}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/repertoire" element={<Repertoire />} />
        <Route path="/postlude" element={<Postlude />} />
      </Routes>
    </Router>
  );
}

export default App;
