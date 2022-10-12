import { React, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { getVideogameDetail } from "../../redux/actions/action";

import Navbar from "../Navbar/Navbar";

import style from "./GameDetails.module.css";

function GameDetails(props) {
  const { getVideogameDetail, gameDetails } = props;
  const { idVideogame } = props.match.params;

  // me carga los detalles del juego
  useEffect(() => {
    getVideogameDetail(idVideogame);
  }, [getVideogameDetail, idVideogame]);

  return (
    <div className={style.container}>
      <Navbar />

      <div className={style.detailsContainer}>
        {gameDetails ? (
          <div className={style.details}>
            <h3 className={style.title}>{gameDetails.name}</h3>

            {gameDetails.background_image ? (
              <div className={style.imgDiv}>
                <img
                  className={style.img}
                  src={gameDetails.background_image}
                  alt="Videogame"
                ></img>
              </div>
            ) : (
              <div className={style.imgDiv}>
                <img
                  className={style.img}
                  src="https://via.placeholder.com/150"
                  alt="Videogame"
                ></img>
              </div>
            )}

            <div className={style.info}>
              <p className={style.release}>
                <strong>Release Date</strong>:{" "}
                {`${gameDetails.releaseDate || "None"}`}
              </p>

              <p className={style.rating}>
                <strong>Rating</strong>: ★ {`${gameDetails.rating || "None"}`}
              </p>

              {gameDetails.description &&
              gameDetails.genres &&
              gameDetails.platforms ? (
                <div className={style.descriptionContainer}>
                  <p className={style.description}>
                    {/*regexp para sacar los elementos html e.g. <p></p>*/}
                    {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                  </p>

                  <p className={style.genres}>
                    <strong>Genres</strong>:{" "}
                    {`${gameDetails.genres.join(", ")}`}
                  </p>

                  <p className={style.platforms}>
                    <strong>Platforms</strong>:{" "}
                    {`${
                      typeof gameDetails.platforms === "string"
                        ? gameDetails.platforms
                        : gameDetails.platforms.join(", ")
                    }`}
                  </p>

                  <NavLink to="/videogames">
                    <button className={style.btn}>Volver</button>
                  </NavLink>
                </div>
              ) : (
                <h1>Cargando...</h1>
              )}
            </div>
          </div>
        ) : (
          <h1>Cargando...</h1>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    gameDetails: state.gameDetails,
  };
};

export default connect(mapStateToProps, { getVideogameDetail })(GameDetails);
