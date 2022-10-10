require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");

const { Genre } = require("../db.js");

const { API_KEY } = process.env;

const router = Router();

//-----> GET "/genres" <--------

router.get("/", async (req, res) => {
  try {
    // si ya los tengo cargados en la DB los consumo desde alli.
    const genresDb = await Genre.findAll();

    if (genresDb.length !== 0) return res.json(genresDb);

    //sino --> los voy a buscar a la API
    const {data} = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = data.results; // recibo un array de objetos con los juegos filtrados por GENERO

    // guardo solo el nombre del genero en la base de datos
    genres.forEach(async (genre) => {
      await Genre.findOrCreate({
        where: {
          name: genre.name,
        },
      });
    });

    // creo un array de objetos con las propiedades id y name para enviar al front
    const genresArr = genres.map((genre) => {
      return {
        id: genre.id,
        name: genre.name,
      };
    });
    
    res.json(genresArr);
  } catch (err) {
    return console.error(err.message);
  }
});

module.exports = router;
