import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./hooks/useAuth";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import WaitTime from "./pages/WaitTime";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import Profil from "./pages/Profil";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attente" element={<WaitTime />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
