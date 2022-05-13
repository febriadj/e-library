import React from 'react';
import moment from 'moment';

import style from '../../styles/components/bookCatalog/table.css';
import handleGetLoan from '../../helpers/handleGetLoan';

function Table({
  catalogs,
  handleGetBookCatalogs,
  handleInfoboxData,
  setUpdateData,
  setUpdateBookIsOpen,
  setDetails,
  page,
  setConfirmDelete,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const handleDeleteBook = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/books' : '/api/books';

      const loan = await handleGetLoan(args.bookCode);
      if (loan.length > 0) throw loan;

      const request = await (await fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookCode: args.bookCode,
        }),
      })).json();

      if (!request.success) throw request;

      const ctx = document.getElementsByClassName(style.row)[args.index];
      ctx.style = 'opacity: 0';

      setTimeout(() => {
        handleGetBookCatalogs(pagLimit.book);
        handleInfoboxData();

        setTimeout(() => {
          ctx.style = 'opacity: 1';
        }, 500);
      }, 500);
    }
    catch (error0) {
      setConfirmDelete(() => ({
        data: {
          index: args.index + 1,
          bookCode: args.bookCode,
        },
        isOpen: true,
      }))
    }
  }

  const handleUpdateBook = (args) => {
    setUpdateData(args);
    setUpdateBookIsOpen(true);
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
          <td className={style.column}>Book Code</td>
          <td className={style.column}>Book Title</td>
          <td className={style.column}>Author</td>
          <td className={style.column}>Publisher</td>
          <td className={style.column}>Stock</td>
          <td className={style.column}>Published</td>
          <td className={`${style.column} ${style.action}`}>Action</td>
        </tr>
      </thead>
      <tbody className={style.tbody}>
        {
          catalogs.map((item, index) => (
            <tr className={style.row} key={item.bookCode}>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">
                {page > 1 ? (pagLimit.book * (page - 1)) + (index + 1) : index + 1}
              </td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.bookCode}</td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.title}</td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.author}</td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">
                {item.publisher ? item.publisher : '-'}
              </td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{item.stock}</td>
              <td className={style.column} onClick={() => handleOpenDetails(item)} aria-hidden="true">{moment(item.publicationDate).format('ll')}</td>
              <td className={`${style.column} ${style.action}`}>
                <button
                  type="button"
                  className={style.btn}
                  onClick={() => handleUpdateBook(item)}
                >
                  <box-icon name="pencil"></box-icon>
                </button>
                <button
                  type="button"
                  className={style.btn}
                  onClick={() => handleDeleteBook({
                    index: index + 1,
                    bookCode: item.bookCode,
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
