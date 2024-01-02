const {getPokemons,getPokemonById,getNamePokemons,createPokemon} = require('../controllers/pokemonControllers');


////// Obtiene un arreglo de objetos //////
const handlerGetPokemons= async(req, res) =>{
    try {
        const pokemon= await getPokemons();
        res.status(200).json(pokemon)
    }catch (error) {
        res.status(404).json({error: error.message});
    }
};

//////obtiene el detalle de un pokemon específico//////
const handlerById= async(req, res)=>{
    try {
        const {id}= req.params;
        const pokemon= await getPokemonById(id);
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

////// obtener todos aquellos pokemons que coinciden con el nombre //////
const handlersName= async(req, res)=> {
    try {
        const {name}= req.query
        const pokemon= await getNamePokemons(name);
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

//////recibe todos los datos necesarios para crear un pokemon//////
const handlerPost = async(req, res)=>{
    try { 
        const {name, image, life, speed, attack, defense, height, weight, types} = req.body;
        const pokemon = await createPokemon(name, image, life, speed, attack, defense, height, weight, types)
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};
    

module.exports = {
    handlerGetPokemons,
    handlerById,
    handlersName,
    handlerPost
}
