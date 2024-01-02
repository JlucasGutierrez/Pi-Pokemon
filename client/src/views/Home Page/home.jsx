import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear_results, get_all_pokemons } from "../../Redux/actions";

import Cards from "../../components/Cards/cards"
import Filter from "../../components/filters/Filter";
import style from './home.module.css'
import Paginado from "../../components/Paginado/paginado";
import loanding from '../../utils/loanding.gif'




const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    dispatch(get_all_pokemons())
      .then(() => setIsLoading(false)) // Cuando la carga se complete, establece isLoading en false
      .catch((error) => {
        console.error("Error al cargar los pokemons:", error);
        setIsLoading(false); // En caso de error, asegúrate de que isLoading sea false
      });

    return () => {
      dispatch(clear_results());
    };
  }, [dispatch]);

  // Número de elementos
  const itemsPerPage = 12;

  // Obtiene el número total de pokemons
  const totalPokemon = pokemons?.length;

  const [currentPage, setCurrentPage] = useState(0);

  // Calcula los índices del primer y último pokemon que quieres mostrar en la página actual
  const indexOfLastPokemon = (currentPage + 1) * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;

  // Usa esos índices para obtener los pokemons que quieres mostrar en la página actual
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <div className={style.home}>
    {isLoading ? (
      <img className={style.loading} src={loanding} alt="loanding"/>
      // <div className={style.loading}>
      //   <span></span>
      //   <span></span>
      //   <span></span>
      //   <span></span>
      //   <span></span>
      // </div>
    ) : (
        <>
          <Filter />
          <Cards pokemons={currentPokemons} />
          <Paginado
            itemsPerPage={itemsPerPage}
            totalItems={totalPokemon}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
