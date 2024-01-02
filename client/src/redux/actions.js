import axios from "axios";

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_BY_ID = 'GET_BY_ID';
export const GET_BY_NAME = 'GET_BY_NAME';
export const POST_POKEMONS = 'POST_POKEMONS'
export const GET_TYPES = 'GET_TYPES';
export const FILTER_TYPE = 'FILTER_TYPE';
export const ORDER_ALF = 'ORDER_ALF';
export const ORDER_ATTACK = 'ORDER_ATTACK';
export const FILTER_ORIGIN ='FILTER_ORIGIN';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const CLEAR_DETAIL= 'CLEAR_DETAIL';

export const get_all_pokemons = () => {
 return async (dispatch) => {
 const apiData = await axios.get("http://localhost:3001/pokemons");
 
 const pokemons= apiData.data;
  dispatch({type: GET_ALL_POKEMONS, payload: pokemons})};
};


export const get_by_name = (name) => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/name?name=${name}`);
    const pokemons= apiData.data;
    dispatch({type: GET_BY_NAME, payload: pokemons})
  }; 
};

export const get_by_id = (id) => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
    // console.log(apiData)
    const pokemons= apiData.data;
      dispatch({type: GET_BY_ID, payload: pokemons})
    };
};

export const createPokemon = (data) =>{
  // console.log({data})
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/create', data)
      // console.log(response.data);
      alert('Pokemon Creado')
      dispatch ({
        type:POST_POKEMONS,
        payload: response.data,});
      } catch (error) {
          // console.log(error);
          alert('No se puede crear,Verifica que los campos esten completos o que no se repita su nombre')
        }
  }
};


  export const get_types = () => {
    return async (dispatch) => {
      const response = await axios.get("http://localhost:3001/type");
        const getTypes= response.data;
        dispatch({ type: GET_TYPES, payload: getTypes });
    };
  };
 

  export const filter_type = (name) => {
    return{ type: FILTER_TYPE, payload: name} 
  }


export const filter_origin = (value) => {
    return{ type: FILTER_ORIGIN, payload: value} 
}

  export const order_Alf= (order) =>{
    return { type: ORDER_ALF, payload: order}
}

export const order_Attack = (order) =>{
    return{ type: ORDER_ATTACK, payload: order }
}


export const clear_results = ()=> {
  return {type: CLEAR_RESULTS}
}

export const clear_detail = () => {
  return {type: CLEAR_DETAIL}
}




