import React from "react";

import { connect } from "react-redux";
import { orderBy, filterBy } from "../../redux/actions/action";

import style from "./FilterBy.module.css";

function FilteredBy({ orderBy, genres, filterBy }) {
  const filterGame = (e) => {
    filterBy(e.target.value);
  };

  const filterByOrder = (e) => {
    orderBy(e.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.subcontainer}>
        <select className={style.selectCont} onChange={filterGame}>
          <option value="default">TODOS...</option>

          <optgroup label="DataBase">
            <option value="DB">CREADOS</option>
          </optgroup>

          <optgroup label="API">
            <option value="API">API</option>
          </optgroup>

          <optgroup label="GENRES">
            {genres &&
              genres.map((g) => (
                <option key={g.name} value={g.name}>
                  {g.name}
                </option>
              ))}
          </optgroup>
        </select>
        <select className={style.selectCont} onChange={filterByOrder}>
          <option value="default">ORDEN...</option>

          <optgroup label="Rating">
            <option value="asc">Mayor a Menor</option>
            <option value="desc">Menor a Mayor</option>
          </optgroup>

          <optgroup label="Alphabetic">
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
  };
};

export default connect(mapStateToProps, { orderBy, filterBy })(FilteredBy);
