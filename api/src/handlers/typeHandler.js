const getType = require('../controllers/typesController');

////// Obtiene un arreglo con todos los tipos de pokemones//////
const getTypeHandlers = async (req, res) => {
    try {
        const tipe = await getType();
        res.status(200).json(tipe)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = getTypeHandlers;