const axios = require("axios");
const { Pokemon, Type } = require("../db.js");


//////Obtiene un Pokemon con su Info//////

/// 1-Base de la API definida pra recibir 120 pokemones
/// 2-obtenemos los pokemon de la base de datos y sus tipos
/// 3-Map a la base de datos
/// 4-solicitamos a la API para obtener los pokemones(datos)
/// 5-Obtenemos los datos de la API
/// 6-Map a la API a un nuevo formato.
/// 7-Promesas de la API cumplidas
/// 8-Junta los Pokemones de la API y la BASE DE DATOS

let BASE_URL = "https://pokeapi.co/api/v2/pokemon/?limit=310"; /// 1

const getPokemons = async () => {
  
  const dbPokemons = await Pokemon.findAll({ include: { model: Type } }); /// 2
  const newPokemons = dbPokemons.map((poke) => { /// 3
    return {
      id: poke.id,
      name: poke.name,
      image: poke.image,
      attack: poke.attack,
      defense: poke.defense,
      height: poke.height,
      weight: poke.weight,
      life: poke.life,
      speed: poke.speed,
      types: poke.Types.map((types) => types.name),
    };
  });

  const solicitPokemons = await axios.get(BASE_URL); /// 4
  
  const response = solicitPokemons.data.results; /// 5

  const apiPokemons = response.map(async (pokemon) => {  /// 6
    const apiData = await axios.get(pokemon.url);
    const data = apiData.data;
    const mapData = {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      attack: data.stats[1]["base_stat"],
      defense: data.stats[2]["base_stat"],
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
      life: data.stats[0]["base_stat"],
      types: data.types.map((type) => type.type.name),
    };
    return mapData;
  });

  const pokedata = await Promise.all(apiPokemons); /// 7

  const totalData = newPokemons.concat(pokedata); /// 8

  return totalData;
};


//////obtiene el detalle de un Pokemon específico//////

/// 1-FIltra pokemones por ID en la BASE DE DATOS
/// 2-Solicitamos a la API Buscar por ID
/// 3-Crear un objeto con datos del Pokémon encontrado en la API


const getPokemonById = async (id) => {
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
  
    if (id.toString().length > 5) { /// 1
      const pokemonDb = [await Pokemon.findByPk(id, { include:  { model: Type } })]
      const newPokemon = pokemonDb.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          life: pokemon.life,
          attack: pokemon.attack,
          defense: pokemon.defense,
          height: pokemon.height,
          weight: pokemon.weight,
          speed: pokemon.speed,
          types: pokemon.Types.map(type => type.name)
        }
      })
      return newPokemon[0];
    }
   
    const response = await axios.get(`${BASE_URL}${id}`); /// 2
    const data = response.data;
  
    
  

  const dataPokemon = { /// 3
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    life: data.stats[0].base_stat,
    types: data.types.map(type => type.type.name), 
  };
  
  return dataPokemon;
};


//////  obtener todos aquellos pokemons que coinciden con el nombre //////

/// 1-Busca el nombre del pokemon en la BASE DE DATOS(Query)
/// 2-Obtiene el POKEMON
/// 3-Busca en la API el POKEMON por nombre
/// 4-Obtiene al Pokemon
const getNamePokemons = async (name) => {
    let BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
  
   const pokemon = await Pokemon.findOne({ /// 1
      where: { name: name },
      include: [
          {
              model: Type,
              attributes: ["name"],
               /// Evita traer los datos de la tabla 
          }]
  })
 
  if (pokemon) { /// 2
      return pokemon
     
  } else { /// 3
      const { id, sprites, stats, height, weight, types } = (await axios.get(`${BASE_URL}/${name}`)).data
      console.log({types})
      const pokemon = { /// 4
          id: id,
          name: name,
        
          image: sprites.other['official-artwork'].front_default,
          life: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          speed: stats[5].base_stat,
          height: height,
          weight: weight,
          types: types.map(e => e.type.name)
      }
      return pokemon
  }
  };


  ////// crear un Pokemon y relacionarlo con sus tipos //////

  /// 1-Crea un pokemon y lo almacena en la variable(response)
  /// 2-busca en la BASE DE DATOS el tipo con su nombre
  /// 3-Si no hay Tipo asignado,Se crea el POKEMON
  const createPokemon = async (name, image, life, speed, attack, defense, height, weight, types) => {
    const response = await Pokemon.create({
      name,
      image,
      attack,
      defense,
      height,
      weight,
      life,
      speed,
    });
    
    await Promise.all(types.map(async (temp) => { /// 2
      const primerType = await Type.findOne({ where: { name: temp } });
      if (primerType) { /// 3
        await response.addType(primerType);
      }
    }))
    
    return response;
};
  

module.exports = {
    getPokemons,
    getPokemonById,
    getNamePokemons,
    createPokemon,
}




