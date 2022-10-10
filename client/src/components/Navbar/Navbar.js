import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Navbar.module.css";

function NavBar() {
  return (
    <div className={style.navbarDiv}>
      <NavLink to="/" className={style.link}>
        <button className={style.btn}>Intro</button>
      </NavLink>

      <NavLink to="/videogames" className={style.link}>
        <button className={style.btn}>Videogames</button>
      </NavLink>

      <NavLink to="/crearjuego" className={style.link}>
        <button className={style.btn}>Crear Juego</button>
      </NavLink>

      <NavLink to="/about" className={style.link}>
        <button className={style.btn}>About</button>
      </NavLink>
    </div>
  );
}

export default NavBar;
