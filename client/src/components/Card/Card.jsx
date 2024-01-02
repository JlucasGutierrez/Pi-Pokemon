import style from './card.module.css';
import { Link } from 'react-router-dom';


const Card = ({ name, types, image, id }) => {


  return (
    <div className={style.card}>
       <Link to={`/detail/${id}`} key={id}>
       <p>{name}</p>
      <img className={style.cardImage} src={image} alt={name} />
      <h3>{types}</h3>
      </Link>
    </div>
  );
};

export default Card;
