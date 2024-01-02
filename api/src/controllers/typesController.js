const axios = require('axios');
const { Type } = require('../db');

//Esta función se encarga de obtener y sincronizar los tipos de Pokémon 
//desde la API y la base de datos 
const getType = async () => {
    const typeApi = await axios.get(`https://pokeapi.co/api/v2/type`);
    const result = typeApi.data;

    for (const typeData of result.results) {//itera sobre cada elemento en el arreglo result.results
        //Para cada iteración del bucle, typeData tomará el valor del elemento actual del arreglo
        // y puedes acceder a sus propiedades.
        const typeName = typeData.name;//se utiliza para acceder al nombre de cada tipo dentro del bucle.

        const existingType = await Type.findAll({ where: { name: typeName } });

        if (existingType.length === 0) {
            // Si no existe, crea un nuevo registro en la base de datos
            await Type.create({ name: typeName });
        }
    }

    return await Type.findAll();
}
module.exports = getType;