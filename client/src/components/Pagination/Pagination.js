import React from "react";
import style from "./Pagination.module.css"

export default function Pagination({
  cardPerPage,
  totalCards,
  paginate,
  currentPage,
}) {

  if (Math.ceil(totalCards / cardPerPage) < currentPage) {
    paginate(1);
  }

  // cantidad de paginas en base a cantidad de juegos
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      <ul className={style.pages}>
        {pageNumbers.length > 1 &&
          pageNumbers.map((page, i) =>
            page === currentPage ? (
              <li key={i}>
                <button className={style.pageNumber} onClick={() => paginate(page)}>
                  {page}
                </button>
              </li>
            ) : (
              <li key={i}>
                <button className={style.pageNumber} onClick={() => paginate(page)}>
                  {page}
                </button>
              </li>
            )
          )}
      </ul>
    </div>
  );

}
