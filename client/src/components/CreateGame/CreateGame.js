import { React, useState } from "react";
import axios from "axios";

import Navbar from "../Navbar/Navbar";

import style from "./CreateGame.module.css";

function CreateGame(props) {
  const [errors, setErrors] = useState({ form: "Must complete the form" });

  const [form, setForm] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  const handleChange = (e) => {
    if (e.target.parentNode.parentNode.id === "genres") {
      if (e.target.checked) {
        setForm((prevState) => ({
          ...prevState,
          genres: form.genres.concat(e.target.value),
        }));
      } else {
        setForm((prevState) => ({
          ...prevState,
          genres: form.genres.filter((x) => e.target.value !== x),
        }));
      }
    }

    if (e.target.parentNode.parentNode.id === "platforms") {
      if (e.target.checked) {
        setForm((prevState) => ({
          ...prevState,
          platforms: form.platforms.concat(e.target.name),
        }));
      } else {
        setForm((prevState) => ({
          ...prevState,
          platforms: form.platforms.filter((x) => e.target.name !== x),
        }));
      }
    }

    if (e.target.type !== "checkbox") {
      setForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }

    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const validate = (form) => {
    let errors = {};

    if (!form.name) {
      errors.name = "Game Name is required";
    } else if (form.name.length < 4) {
      errors.name = "Game Name must have at least 4 characters";
    }

    if (!form.description) {
      errors.description = "Description is required";
    } else if (form.description.length < 8) {
      errors.description = "Description must have at least 8 characters";
    }

    if (!form.rating) {
      errors.rating = "Rating is required";
    } else if (!/^[1-5]$/.test(form.rating)) {
      errors.rating = "Rating must be between 1 and 5";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(form);
    let checkboxsErrors = [];

    if (form.genres.length < 1) checkboxsErrors.push("Genres is required");

    if (form.platforms.length < 1)
      checkboxsErrors.push("Platforms is required");

    if (Object.values(errors).length || checkboxsErrors.length) {
      // Object.values --> retorno un array con los values
      return alert(Object.values(errors).concat(checkboxsErrors).join("\n"));
    }

    axios
      .post("http://localhost:3001/videogames", form)
      .then((res) => console.log(res.data));

    alert(`${form.name} Creado Correctamente`);

    props.history.push("/videogames");
  };

  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className={style.subcontainer}>
          <h2>CREATE GAME - DETAILS -</h2>
          <div className={style.formContainer}>
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <div className={style.formInputs}>
                <div className={style.formText}>
                  <label htmlFor="name">
                    <strong>Name: </strong>
                  </label>
                  <input
                    className={style.nameInput}
                    placeholder="Name"
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="off"
                  />

                  <label htmlFor="description">
                    <strong>Description: </strong>
                  </label>
                  <textarea
                    className={style.description}
                    name="description"
                    placeholder="Description..."
                    id="description"
                    cols="30"
                    rows="3"
                  />

                  <label htmlFor="date">
                    <strong>Release Date: </strong>
                  </label>
                  <input
                    name="releaseDate"
                    className={style.releaseInput}
                    type="date"
                    id="date"
                    required
                  />

                  <label htmlFor="rating">
                    <strong>Rating: </strong>
                  </label>
                  <input
                    name="rating"
                    className={style.ratingInput}
                    placeholder="Rate from 1 to 5"
                    type="tel"
                    id="rating"
                    maxLength="1"
                    autoComplete="off"
                  />
                </div>

                <div className={style.formChecks}>
                  <div className={style.genresContainer}>
                    <label>
                      <strong>Genres:</strong>
                    </label>

                    <div id="genres" className="genresChecks">
                      <div>
                        <input
                          name="Action"
                          value="Action"
                          type="checkbox"
                          id="Action"
                        />
                        <label htmlFor="Action">Action.</label>
                      </div>

                      <div>
                        <input
                          name="Indie"
                          value="Indie"
                          type="checkbox"
                          id="Indie"
                        />
                        <label htmlFor="Indie">Indie.</label>
                      </div>

                      <div>
                        <input
                          name="Adventure"
                          value="Adventure"
                          type="checkbox"
                          id="Adventure"
                        />
                        <label htmlFor="Adventure">Adventure.</label>
                      </div>

                      <div>
                        <input name="RPG" value="RPG" type="checkbox" id="RPG" />
                        <label htmlFor="RPG">RPG.</label>
                      </div>

                      <div>
                        <input
                          name="Strategy"
                          value="Strategy"
                          type="checkbox"
                          id="Strategy"
                        />
                        <label htmlFor="Strategy">Strategy.</label>
                      </div>

                      <div>
                        <input
                          name="Shooter"
                          value="Shooter"
                          type="checkbox"
                          id="Shooter"
                        />
                        <label htmlFor="Shooter">Shooter.</label>
                      </div>

                      <div>
                        <input
                          name="Casual"
                          value="Casual"
                          type="checkbox"
                          id="Casual"
                        />
                        <label htmlFor="Casual">Casual.</label>
                      </div>

                      <div>
                        <input
                          name="Simulation"
                          value="Simulation"
                          type="checkbox"
                          id="Simulation"
                        />
                        <label htmlFor="Simulation">Simulation.</label>
                      </div>

                      <div>
                        <input
                          name="Puzzle"
                          value="Puzzle"
                          type="checkbox"
                          id="Puzzle"
                        />
                        <label htmlFor="Puzzle">Puzzle.</label>
                      </div>

                      <div>
                        <input
                          name="Arcade"
                          value="Arcade"
                          type="checkbox"
                          id="Arcade"
                        />
                        <label htmlFor="Arcade">Arcade.</label>
                      </div>

                      <div>
                        <input
                          name="Platformer"
                          value="Platformer"
                          type="checkbox"
                          id="Platformer"
                        />
                        <label htmlFor="Platformer">Platformer.</label>
                      </div>

                      <div>
                        <input
                          name="Racing"
                          value="Racing"
                          type="checkbox"
                          id="Racing"
                        />
                        <label htmlFor="Racing">Racing.</label>
                      </div>

                      <div>
                        <input
                          name="Massively-Multiplayer"
                          value="Massively-Multiplayer"
                          type="checkbox"
                          id="Massively-Multiplayer"
                        />
                        <label htmlFor="Massively-Multiplayer">
                          Massively-Multiplayer.
                        </label>
                      </div>

                      <div>
                        <input
                          name="Sports"
                          value="Sports"
                          type="checkbox"
                          id="Sports"
                        />
                        <label htmlFor="Sports">Sports.</label>
                      </div>

                      <div>
                        <input
                          name="Fighting"
                          value="Fighting"
                          type="checkbox"
                          id="Fighting"
                        />
                        <label htmlFor="Fighting">Fighting.</label>
                      </div>
                    </div>
                  </div>

                  <div className={style.platsContainer}>
                    <label>
                      <strong>Platforms: </strong>{" "}
                    </label>

                    <div id="platforms">
                      <div>
                        <input name="PC" type="checkbox" id="PC" />
                        <label htmlFor="PC">PC.</label>
                      </div>

                      <div>
                        <input name="iOS" type="checkbox" id="iOS" />
                        <label htmlFor="iOS">iOS.</label>
                      </div>

                      <div>
                        <input name="Android" type="checkbox" id="Android" />
                        <label htmlFor="Android">Android.</label>
                      </div>

                      <div>
                        <input name="macOS" type="checkbox" id="macOS" />
                        <label htmlFor="macOS">macOS.</label>
                      </div>

                      <div>
                        <input
                          name="PlayStation 4"
                          type="checkbox"
                          id="PlayStation 4"
                        />
                        <label htmlFor="PlayStation 4">PlayStation 4.</label>
                      </div>

                      <div>
                        <input
                          name="PlayStation 5"
                          type="checkbox"
                          id="PlayStation 5"
                        />
                        <label htmlFor="PlayStation 5">PlayStation 5.</label>
                      </div>

                      <div>
                        <input name="XBOX" type="checkbox" id="XBOX" />
                        <label htmlFor="XBOX">XBOX.</label>
                      </div>
                      
                      <div>
                        <input name="PS Vita" type="checkbox" id="PS Vita" />
                        <label htmlFor="PS Vita">PS Vita.</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.btnContainer}>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateGame;
