import React from 'react';
import style from '../../styles/components/bookCatalog/infobox.css';

function Infobox({ catalogs }) {
  const handleTotalStock = () => {
    const stock = catalogs.map((item) => item.stock);
    return stock.length > 0 ? stock.reduce((prev, curr) => prev + curr) : `${0}${0}`;
  }

  return (
    <div className={style.infobox}>
      <div className={style.box}>
        <div className={style.content}>
          <p className={style.title}>Total Books</p>
          <h1 className={style.total}>{catalogs.length < 10 ? `0${catalogs.length}` : catalogs.length}</h1>
        </div>
        <box-icon name="book"></box-icon>
      </div>
      <div className={style.box}>
        <div className={style.content}>
          <p className={style.title}>Total Stock of All Books</p>
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
