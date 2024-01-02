import style from './landing.module.css'
import { Link } from 'react-router-dom';
import landing from '../../utils/Landing.mp4'

const  Landing = () =>  {
  

  return (
  <div className={style.landingg}>
    <div className={style.containervideo}>
      <video className={style.video} autoPlay loop muted>
        <source src={landing} type="video/mp4" /> 
      </video>
       <Link to="/home">
          <button className={style.buttonlanding}>POKEMON CARDS</button>
       </Link>
   </div>
  </div>
  );
}
export default Landing;

// <Link to='/home'>
// <button className={style.button}>Go Cards</button>
// </Link>