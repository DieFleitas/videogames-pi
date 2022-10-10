import React from "react";
import Navbar from "../Navbar/Navbar";

import style from "./About.module.css"


function About() {
  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className={style.aboutContainer}>
          <h1>Individual Project - Videogames</h1>
        <h1>Diego Fleitas</h1>
        <div className={style.info}>
          <p>Proyecto sobre video games usando información de Base de Datos y de <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer">API</a>. Fue hecho usando las siguientes herramientas: <span>ReactJS, Redux, NodeJS, ExpressJS, Postgres, Sequelize</span>  </p>

          <p> <a href="https://github.com/DieFleitas/videogames-pi" target="_blank" rel="noreferrer">Link del repo</a> </p>
        </div>
        </div>
        
      </div>
    </>
  );
}

export default About;
