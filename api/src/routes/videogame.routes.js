require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");

const { Videogame, Genre } = require("../db.js");

const { API_KEY } = process.env;

const router = Router();

//  ------> GET /videogame/:idVideoGame <-------

// consulto el detalle del juego por el ID
router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;

  //verifico si es un juego creado y me traigo el detalle de la base de datos. Ejemplo de id de DB ->  6f47bafd-6073-48ca-b0af-826a901e7ec5
  if (idVideogame.includes("-")) {
    let videogameDb = await Videogame.findOne({
      where: {
        id: idVideogame,
      },
      include: Genre, // JOIN Genre model
    });

    //Parseo el objeto
    videogameDb = JSON.parse(JSON.stringify(videogameDb));

    //dejo un array con los nombres de genero solamente
    videogameDb.genres = videogameDb.genres.map((genre) => genre.name);

    res.json(videogameDb);
  } else {
    //else (si no es un juego creado, voy a buscar la info a la API)
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );

      let {
        id,
        name,
        background_image,
        genres,
        description,
        released: releaseDate,
        rating,
        platforms,
      } = response.data;

      genres = genres.map((genre) => genre.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
      platforms = platforms.map((p) => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma

      const videogame = {
        id,
        name,
        background_image,
        genres,
        description,
        releaseDate,
        rating,
        platforms,
      };
      
      return res.json(videogame);
    } catch (err) {
      return console.error(err.message);
    }
  }
});

module.exports = router;
