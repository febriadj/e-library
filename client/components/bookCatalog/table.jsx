import React from 'react';
import style from '../../styles/components/bookCatalog/table.css';

function Table({
  catalogs,
}) {
  const formatDate = (args) => {
    const date = new Date(args).toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return date;
  }

  return (
    <table className={style.table}>
      <thead className={style.thead}>
        <tr className={style.row}>
          <td className={style.column}>No</td>
          <td className={style.column}>Book Code</td>
          <td className={style.column}>Book Title</td>
          <td className={style.column}>Author</td>
          <td className={style.column}>Publisher</td>
          <td className={style.column}>Stock</td>
          <td className={style.column}>Published</td>
          <td className={style.column}>Action</td>
        </tr>
      </thead>
      <tbody className={style.tbody}>
        {
          catalogs.map((item, index) => (
            <tr className={style.row} key={item.bookCode}>
              <td className={style.column}>{index + 1}</td>
              <td className={style.column}>{item.bookCode}</td>
              <td className={style.column}>{item.title}</td>
              <td className={style.column}>{item.author}</td>
              <td className={style.column}>{item.publisher}</td>
              <td className={style.column}>{item.stock}</td>
              <td className={style.column}>{formatDate(item.publicationDate)}</td>
              <td className={style.column}>
                <box-icon name="edit"></box-icon>
                <box-icon name="trash"></box-icon>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
