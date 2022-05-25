import React from 'react';
import style from '../../styles/components/loan/infobox.css';

function Infobox({ loans }) {
  const handleTotalStock = () => {
    const stock = loans.map((item) => item.stock);
    const reduced = stock.length > 0 ? stock.reduce((prev, curr) => prev + curr) : 0;

    return reduced > 0 && reduced < 10 ? `0${reduced}` : reduced;
  }

  return (
    <div className={style.infobox}>
      <div className={style.box}>
        <div className={style.content}>
          <p className={style.title}>Loan Amount</p>
          <h1 className={style.total}>
            {loans.length > 0 && loans.length < 10 && 0}{loans.length}
          </h1>
        </div>
        <span className={style.icon}>
          <box-icon name="shopping-bag"></box-icon>
        </span>
      </div>
      <div className={style.box}>
        <div className={style.content}>
          <p className={style.title}>Total Stock</p>
          <h1 className={style.total}>{handleTotalStock()}</h1>
        </div>
        <span className={style.icon}>
          <box-icon name="layer"></box-icon>
        </span>
      </div>
      <div className={style.box}>
        <canvas className={style.canvas} width={100}></canvas>
      </div>
    </div>
  );
}

export default Infobox;
