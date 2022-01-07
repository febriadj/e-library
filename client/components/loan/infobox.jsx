import React from 'react';
import style from '../../styles/components/bookCatalog/infobox.css';

function Infobox({ loans }) {
  const handleTotalStock = () => {
    const stock = loans.map((item) => item.stock);
    return stock.length > 0 ? stock.reduce((prev, curr) => prev + curr) : `${0}${0}`;
  }

  return (
    <div className={style.infobox}>
      <div className={style.box}>
        <div className={style.content}>
          <p className={style.title}>Registered Loan Amount</p>
          <h1 className={style.total}>{loans.length < 10 ? `0${loans.length}` : loans.length}</h1>
        </div>
        <box-icon name="book"></box-icon>
      </div>
      <div className={style.box}>
        <div className={style.content}>
          <p className={style.title}>Total Stock All Loans</p>
          <h1 className={style.total}>{handleTotalStock()}</h1>
        </div>
        <box-icon name="layer"></box-icon>
      </div>
      <div className={style.box}>
        <canvas className={style.canvas} height={150}></canvas>
      </div>
    </div>
  );
}

export default Infobox;
