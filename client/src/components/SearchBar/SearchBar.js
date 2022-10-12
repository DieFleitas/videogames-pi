import { React, useState } from "react";

import { connect } from "react-redux";
import { searchByName, getAllGames } from "../../redux/actions/action";

import style from "./SearchBar.module.css";

function SearchBar({ searchByName, getAllGames }) {
  const [input, setInput] = useState({
    buscar: "",
  });

  const handleInputChange = function (e) {
    setInput({
      buscar: e.target.value,
    });
  };

  const handleOnClick = () => {
    searchByName(input.buscar);
    setInput({
      buscar: "",
    });
  };

  const handleOnClickAll = () => {
    getAllGames();
    setInput({
      buscar: "",
    });
  };

  return (
    <div className={style.searchBarDiv}>
      <div className={style.subcontainer}>
        <input
          className={style.barInput}
          name="buscar"
          placeholder="Buscá tu juego..."
          onChange={handleInputChange}
          value={input.buscar}
          autoComplete="off"
        ></input>

        <div className={style.btnContainer}>
          <button className={style.btn} onClick={handleOnClick}>
            Buscar
          </button>
          <button className={style.btn} onClick={handleOnClickAll}>
            CargarTodos
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default connect(null, { searchByName, getAllGames })(SearchBar);
