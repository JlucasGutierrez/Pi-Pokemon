import {Link} from "react-router-dom"
import style from "./navBar.module.css"
import SearchBar from "../Search Bar/SearchBar";




const NavBar = () => {
    return (
        
    <div className={style.nav}>     
        <button className={style.button}><Link to="/form">Create</Link></button>
        <div className={style.Search}><SearchBar/></div>
        <button className={style.button}><Link to="/exit">Exit</Link></button>
    </div>
    )   
};

export default NavBar;