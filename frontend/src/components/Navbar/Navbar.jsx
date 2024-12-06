import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // Postavljamo početnu vrednost na osnovu tokena
  const navigate = useNavigate();

  useEffect(() => {
    // Proveravamo da li token postoji i nije prazan
    setIsLoggedIn(!!token);
  }, [token]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        Brand
      </div>
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        {/* <a href="#about">About</a>
        <a href="#services">Services</a> */}
        {isLoggedIn ? (
          <>
            <a href="/profile">Profil</a>
            <a href="/chat">Asistent</a>
            <a href="/chat/image">Analiziraj sliku</a>
            <a onClick={handleLogout} href="#">
              Logout
            </a>
          </>
        ) : (
          <>
            <a href="/auth?mode=login">Prijavi se</a>
            <a href="/auth?mode=register">Registruj se</a>
          </>
        )}
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
    </nav>
  );
};

export default Navbar;
