import React from 'react';
import style from '../../styles/components/loan/table.css';

function Table({ loans }) {
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
          <td className={style.column}>Member ID</td>
          <td className={style.column}>Book Code</td>
          <td className={style.column}>Book Title</td>
          <td className={style.column}>Full Name</td>
          <td className={style.column}>Stock</td>
          <td className={style.column}>Deadline</td>
          <td className={`${style.column} ${style.action}`}>Action</td>
        </tr>
      </thead>
      <tbody className={style.tbody}>
        {
          loans.map((item, index) => (
            <tr className={style.row} key={item.id}>
              <td className={style.column}>{index + 1}</td>
              <td className={style.column}>{item.memberId}</td>
              <td className={style.column}>{item.bookCode}</td>
              <td className={style.column}>{item.bookTitle}</td>
              <td className={style.column}>{item.fullname}</td>
              <td className={style.column}>{item.stock}</td>
              <td className={style.column}>{formatDate(item.deadline)}</td>
              <td className={`${style.column} ${style.action}`}>
                <button type="button" className={style.btn}>
                  <box-icon name="pencil"></box-icon>
                </button>
                <button
                  type="button"
                  className={style.btn}
                  // onClick={() => handleDeleteBook({
                  //   index: index + 1,
                  //   bookCode: item.bookCode,
                  // })}
                >
                  <box-icon name="trash"></box-icon>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
