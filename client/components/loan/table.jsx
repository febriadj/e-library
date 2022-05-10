import React from 'react';
import moment from 'moment';
import style from '../../styles/components/loan/table.css';

function Table({
  handleGetLoans,
  loans,
  handleInfoboxData,
  setUpdateLoan,
  setDetails,
  page,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

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
        handleGetLoans(pagLimit.loan);
        handleInfoboxData();

        setTimeout(() => {
          ctx.style = 'opacity: 1';
        }, 500);
      }, 500);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handleOpenDetails = (args) => {
    setDetails((prev) => ({
      ...prev,
      data: args,
      isOpen: true,
    }));
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
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">
                {page > 1 ? (pagLimit.loan * (page - 1)) + (index + 1) : index + 1}
              </td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.memberId}</td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.bookCode}</td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.bookTitle}</td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.fullname}</td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.stock}</td>
              <td className={style.column}>
                <span className={`${style.tag} ${new Date(item.deadline) < new Date() && style.expired}`}>
                  {moment(item.deadline).format('ll')}
                </span>
              </td>
              <td className={`${style.column} ${style.action}`}>
                <button
                  type="button"
                  className={style.btn}
                  onClick={() => {
                    setUpdateLoan((prev) => ({
                      ...prev,
                      isOpen: true,
                      data: item,
                    }));
                  }}
                >
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
