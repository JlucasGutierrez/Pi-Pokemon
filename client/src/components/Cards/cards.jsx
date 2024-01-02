import Card from '../Card/Card';
import style from './cards.module.css';

const Cards = ({ pokemons }) => {

return (
    <div className={style.conteiner}>
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
        />
      ))}
    </div>
  );
};

export default Cards;