import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import PageLoaderWrapper from "./components/PageLoaderWrapper/PageLoaderWrapper";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Notes from "./pages/Notes/Notes";
import Reveries from "./pages/Reveries/Reveries";
import Letters from "./pages/Letters/Letters";
import Repertoire from "./pages/Repertoire/Repertoire";
import Postlude from "./pages/Postlude/Postlude";


function App() {
  return (
    <Router>
      <Navbar/>
      <PageLoaderWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/reveries" element={<Reveries />} />
          <Route path="/letters" element={<Letters />} />
          <Route path="/repertoire" element={<Repertoire />} />
          <Route path="/postlude" element={<Postlude />} />
        </Routes>
      </PageLoaderWrapper>
      <Footer/>
    </Router>
  );
}

export default App;
