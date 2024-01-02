import style from './pagination.module.css'

const Paginado = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) => {
  
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const nextHandler = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={style.div}>
      <button className={style.button} onClick={prevHandler}>BACK PAGE</button> 
      <button className={style.button} onClick={nextHandler}>NEXT PAGE</button>
      
    </div>
  );
};

export default Paginado;
