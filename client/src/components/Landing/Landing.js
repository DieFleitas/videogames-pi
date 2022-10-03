import { Link } from "react-router-dom";
import style from './Landing.module.css'

export default function Landing() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>Explora Los Mejores Videojuegos</h1>
        <Link to="/videogames">
        <button className={style.btn}>Explorar</button>
      </Link>
      </div>
      
    </div>
  );
}
