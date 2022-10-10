import React from "react";
import { Link } from "react-router-dom";

import style from "./Vidogame.module.css";

export default function Videogame(props) {
  return (
    <div className={style.gameContainer}>
      <div className={style.titleGame}>{props.name}</div>

      <div className={style.imgContainer}>
        {props.image ? (
          <img
            src={`${props.image}`}
            alt="Videogame"
            className={style.img}
          ></img>
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="Videogame"
            className={style.img}
          ></img>
        )}
      </div>

      <div className={style.infoContainer}>
        <div className={style.info}>
          <div className={style.infoRating}>
            {
              <p>
                <strong>Rating</strong>: ★ {`${props.rating}`}
              </p>
            }
          </div>

          <div className={style.infoContGenres}>
            {
              <p>
                <strong>Genres:</strong>{" "}
                {`${
                  typeof props.genres === "string"
                    ? props.genres
                    : props.genres.join(", ")
                }`}
              </p>
            }
          </div>
        </div>

        <div className={style.btnContainer}>
          <div className={style.divButton}>
            {props.id && (
              <Link to={`/videogame/${props.id}`}>
                <button className={style.link}>Details</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
