import React from 'react';
import style from '../../styles/components/loan/table.css';

function Table({
  handleGetLoans,
  loans,
  handleInfoboxData,
}) {
  const isDev = process.env.NODE_ENV === 'development';

  const formatDate = (args) => {
    const date = new Date(args).toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return date;
  }

  const handleDeleteLoan = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/loans' : '/api/loans';

      const request = await (await fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: args.id,
        }),
      })).json();

      if (!request.success) throw request;

      const ctx = document.getElementsByClassName(style.row)[args.index];
      ctx.style = 'opacity: 0';

      setTimeout(() => {
        handleGetLoans();
        handleInfoboxData();

        setTimeout(() => {
          ctx.style = 'opacity: 1';
        }, 500);
      }, 1000);
    }
    catch (error0) {
      console.error(error0.message);
    }
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
                  onClick={() => handleDeleteLoan({
                    index: index + 1,
                    id: item.id,
                  })}
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
