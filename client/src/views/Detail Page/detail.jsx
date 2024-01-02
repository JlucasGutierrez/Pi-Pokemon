import { Link, useParams} from "react-router-dom";
import { clear_detail, get_by_id } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from './Detail.module.css'


const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.pokemonsid);
    

    useEffect(() => {

    dispatch(get_by_id(id))
    return() => dispatch(clear_detail())
    }, [dispatch,id])


   

    return (
    <div className={style.container}>
        <Link to={`/home`}>
            <button >
                <span className={style.text}></span>
                <span className={style.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                    </svg>
                </span>
            </button>
        </Link>
            <div className={style.detail}>
           
                <h3>#{detail?.id}</h3>
                <img src={detail?.image} alt={detail?.name} />
                <h3>{detail?.name}</h3>
                <h3>life: {detail?.life}</h3>
                <h3>Attack: {detail?.attack}</h3>
                <h3>Defense: {detail?.defense}</h3>
                <h3>Speed: {detail?.speed}</h3>
                <h3>Height: {detail?.height}</h3>
                <h3>Weight: {detail?.weight}</h3>
                <h3>types: {detail?.types}</h3>
            </div>
    </div>
    );
};

export default Detail;

