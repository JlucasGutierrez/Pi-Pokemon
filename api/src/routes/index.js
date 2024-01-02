const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {handlerGetPokemons,handlerById,handlersName,handlerPost,} = require('../handlers/pokemonHandler')
const getTypeHandlers = require('../handlers/typeHandler');


const router = Router();

router.get('/pokemons', handlerGetPokemons);

router.get('/pokemons/:id', handlerById);

router.get('/name', handlersName)

router.post('/create', handlerPost);

router.get('/type', getTypeHandlers);


module.exports = router;
