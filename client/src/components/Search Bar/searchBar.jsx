import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  get_by_name } from '../../redux/actions';
import { useState } from 'react';
import style from './searchBar.module.css'


const SearchBar = () => {
    const [name, setName] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        setName(event.target.value)
    }

    // console.log(name);
    const onSearch = (name) => {
      dispatch(get_by_name(name));
      navigate('/home');
      setName('');
    };
    
    return (
        <div >
            <div >
                <input className={style.input} name="myInput" type='search' value={name} onChange={handleChange}  />
                <button className={style.button} onClick={() => { onSearch(name); setName('') }} >
                    Buscar Pokemon</button>
           </div>
        </div>
    )
}

export default SearchBar;
 
