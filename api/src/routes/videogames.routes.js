require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");

const { Videogame, Genre } = require("../db");

const { API_KEY } = process.env;

const router = Router();

//-----> GET  "/videogames" <--------

router.get("/", async (req, res) => {
  //Busco en la base de datos si tengo juegos creados y me traigo todos en formato raw json
  let videogames = await Videogame.findAll({
    include: Genre,
  });

  //Parseo el objeto a string y luego lo parseo a un objeto de js
  videogames = JSON.stringify(videogames);
  videogames = JSON.parse(videogames);

  //Aca dejo el arreglo de generos plano con solo los nombres de cada genero(llega array de objetos)
  videogames = videogames.reduce(
    (acc, el) =>
      acc.concat({
        ...el,
        genres: el.genres.map((g) => g.name),
      }),
    []
  );

  //--------> GET /videogames?name="..." <-----------
  // si llega query "name" lo agarro por aca
  if (req.query.name) {
    try {
      //busco si existe el juego en la API
      let { data } = await axios.get(
        `https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`
      );

      if (!data.count)
        return res.status(204).json(`Juego no encontrado "${req.query.name}"`);

      //filtro SOLO la data que necesito para enviarle al front
      const gamesArr = data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres.map((genre) => genre.name),
        };
      });

      //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
      const filteredGamesByQuery = videogames.filter((game) =>
        game.name.toLowerCase().includes(req.query.name.toLowerCase())
      );

      //doy prioridad a la DB, concateno los primeros 15 games de la api
      const results = [...filteredGamesByQuery, ...gamesArr.splice(0, 15)];

      return res.json(results);
    } catch (err) {
      return console.error(err.message);
    }
  } else {
    // SI NO ENTRO POR QUERIES --> voy a buscar todos los juegos a la API
    try {
      let pages = 0;
      let results = [...videogames]; //sumo lo que tengo en la DB
      let response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );

      while (pages < 6) {
        pages++;
        //filtro solo la DATA que necesito enviar al FRONT
        const allGamesArr = response.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres.map((genre) => genre.name),
          };
        });

        results = [...results, ...allGamesArr];
        response = await axios.get(response.data.next); //Paso a la siguiente pagina con next
      }
      return res.json(results);
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  }
});

//-----> POST /videogames <--------

router.post("/", async (req, res) => {
  let { name, description, releaseDate, rating, genres, platforms } = req.body;
  platforms = platforms.join(", ");
  try {
    const gameCreated = await Videogame.findOrCreate({
      //devuelvo un array (OJOOO!!!!)
      where: {
        name,
        description,
        releaseDate,
        rating,
        platforms,
      },
    });
    await gameCreated[0].setGenres(genres); // relaciono ID genres al juego creado
  } catch (err) {
    console.log(err);
  }
  res.send("Created succesfully, saludos desde el BACK!!");
});

module.exports = router;
