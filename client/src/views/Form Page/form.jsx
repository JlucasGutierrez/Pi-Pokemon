import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, get_types } from '../../redux/actions'
import {Link} from "react-router-dom"
import style from "./form.module.css"


const validation = (pokemonData)=>{
    
    const errors = {}
    
    if (!/^.{4,}$/.test(pokemonData.name)) {
      errors.name = 'El nombre debe contener al menos 4 letras';}
    // else{pokemons.filter((pokemons)=> pokemons.length ==! pokemons)}}
      
    if (!/^.{1,250}$/.test(pokemonData.image)) {
    errors.image ='La URL de la imagen debe tener menos de 250 caracteres';}
    
    if (!/^[1-9][0-9]?$|^100$/.test(pokemonData.life)) {
    errors.life = 'El campo "Vida" debe ser un número entre 1 y 100';}
    
    if (!/^[1-9][0-9]?$|^100$/.test(pokemonData.attack)) {
    errors.attack = 'El campo "Ataque" debe ser un número entre 1 y 100';}
    
    if (!/^[1-9][0-9]?$|^100$/.test(pokemonData.defense)) {
    errors.defense = 'El campo "Defensa" debe ser un número entre 1 y 100';}
    
    if (!/^[1-9][0-9]?$|^100$/.test(pokemonData.speed)) {
    errors.speed = 'El campo "Velocidad" debe ser un número entre 1 y 100';}
    
    if (!/^[1-9][0-9]?$|^100$/.test(pokemonData.height)) {
    errors.height = 'El campo "Altura" debe ser un número entre 1 y 100';}
    
    if (!/^[1-9][0-9]?$|^100$/.test(pokemonData.weight)) {
    errors.weight = 'El campo "Peso" debe ser un número entre 1 y 100';}
    
    if (pokemonData.types.length !== 2) {
    errors.types = 'Debes elegir tipos';}
    
    return errors;
};



const Form = () => {
    
    // const pokemons = useSelector(state => state.pokemons);

    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const [errors, setErrors] = useState({})


    const [pokemonData, setPokemonData] = useState({
        name: '',
        image: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    });
// console.log({pokemonData})
    useEffect(() => {
        dispatch(get_types())
    }, [dispatch])

    const handleChange = (event) => {
        if (event.target.name === 'types') 
          return
           setPokemonData( { ...pokemonData, 
            types: [...pokemonData.types, event.target.value],}) 
           setPokemonData({...pokemonData,
            [event.target.name]: event.target.value});
           setErrors(validation({...pokemonData,[event.target.name]: event.target.value}))
        }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPokemon(pokemonData));
    }

    return (
        <div className={style.form}>
            <Link to="/home">
             <button >
                <span className={style.text}></span>
                <span className={style.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                    </svg>
                </span>
             </button>
            </Link>
            <form onSubmit={handleSubmit}>
            <h1>Crear Pokomon</h1>
            <input type="text" name="image" placeholder="Imagen URL" onChange={handleChange} />
            {pokemonData.image && (
            <img className={style.cardImage}  src={pokemonData.image} alt="Vista previa de la imagen" />)}
            <p>{errors.image}</p>
            <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
            <p >{errors.name}</p>
            <input type="number" name="life" placeholder="Vida" onChange={handleChange} />
            <p>{errors.life}</p>
            <input type="number" name="attack" placeholder="Ataque" onChange={handleChange} />
            <p>{errors.attack}</p>
            <input type="number" name="defense" placeholder="Defensa" onChange={handleChange} />
            <p>{errors.defense}</p>
            <input type="number" name="speed" placeholder="Velocidad" onChange={handleChange} />
            <p>{errors.speed}</p>
            <input type="number" name="height" placeholder="Altura" onChange={handleChange} />
            <p>{errors.height}</p>
            <input type="number" name="weight" placeholder="Peso" onChange={handleChange} />
            <p>{errors.weight}</p>
            <select name="types" multiple onChange={handleChange}>
                {types.map(type => (
                <option key={type.id} value={type.name}>
                    {type.name}
                </option>
                ))}
            </select>
            {errors.types && <p>{errors.types}</p>}
           
            <button type='submit'>Crear Pokemon</button>
            
         </form>
       </div>
    );
};

export default Form;
