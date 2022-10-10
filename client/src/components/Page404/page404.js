import React from "react";
import Navbar from "../Navbar/Navbar"

import style from "./page404.module.css"
import notFound from "../../img/notFound.png"

function Page404() {
  return (
    <>
    <Navbar />
    <div className={style.container}>
      <img src={notFound} alt="not found" />
    </div>
    </>
    
  );
}

export default Page404;
