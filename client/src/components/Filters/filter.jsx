import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { filter_origin, filter_type, get_types, order_Alf, order_Attack,} from '../../redux/actions';
import style from './filters.module.css'

const Filter = () => {

    const types = useSelector(state => state.types);
    const dispatch = useDispatch()
    const [type, setType]= useState("")

    useEffect(()=>
    {
    dispatch(get_types())

    }, [])

    const handlerFiltersTypes= (event) =>{
        const filtritos = event.target.value;
        setType(filtritos);
        dispatch(filter_type(filtritos));
    }


    const handlerfilterOrigin = (event)=>{
        const filter = event.target.value;
        dispatch(filter_origin(filter))
    }

        
    
    const handlerOrder = (event) => {
        dispatch(order_Alf(event.target.value));
    }

    const handlerOrderAttack = (event) => {
        dispatch(order_Attack(event.target.value))
    }



    return(
        <div className={style.div}>
            {/* <button className={style.button} onClick={() => handlerOrder({target: {value: 'asc'}})}>A - Z</button>
             <button className={style.button} onClick={() => handlerOrder({target: {value: 'desc'}})}>Z - A</button> */}
             <button className={style.button} onClick={() => handlerOrderAttack({target: {value: 'asc'}})}>Attack Min</button>
             <button className={style.button} onClick={() => handlerOrderAttack({target: {value: 'desc'}})}>Attack Max</button>
            <select className={style.select} onChange={handlerOrder}>
                <option value= "asc">A - Z</option> 
                <option value= "desc">Z- A</option>
            </select>
            <select className={style.select} onChange={handlerfilterOrigin}>
                {/* <option value="all">All</option> */}
                <option value= "api">Pokemons</option>
                <option value= "db"> Pokemon Creados</option>
            </select>
            <select className={style.select} onChange={handlerFiltersTypes}>
                {types.map(type => (
                    <option key={type.id} value={type.name}>
                        {type.name}
                    </option>
                    
                ))}
            </select>
            
        </div>
    )

}
export default Filter;