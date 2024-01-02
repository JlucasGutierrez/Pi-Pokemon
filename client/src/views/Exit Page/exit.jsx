import style from "./exit.module.css"
import TheEnd from "../../utils/TheEnd.mp4"

function Exit(){
    return(
        <div className={style.exit}>
      <video className={style.video} autoPlay loop muted>
        <source src={TheEnd} type="video/mp4" /> 
      </video>
        </div>
    )
}

export default Exit;