import React from 'react';
import style from '../../styles/components/bookCatalog/confirmDelete.css';

import tableStyle from '../../styles/components/bookCatalog/table.css';

function ConfirmDelete({
  data,
  setConfirmDelete,
  handleGetBookCatalogs,
  handleInfoboxData,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const handleDeleteBook = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/books' : '/api/books';

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

      setTimeout(() => {
        const ctx = document.getElementsByClassName(tableStyle.row)[data?.index];
        ctx.style = 'opacity: 0';

        setTimeout(() => {
          handleGetBookCatalogs(pagLimit.book);
          handleInfoboxData();

          setTimeout(() => {
            ctx.style = 'opacity: 1';
          }, 500);
        }, 500);
      }, 500);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  return (
    <div className={style['confirm-delete']}>
      <span
        className={style['close-area']}
        onClick={() => setConfirmDelete((prev) => ({
          ...prev,
          data: null,
          isOpen: false,
        }))}
        aria-hidden="true"
      >
      </span>
      <div className={style['confirm-delete-wrap']}>
        <div className={style.header}>
          <h2 className={style.title}>Confirm.</h2>
          <span className={style.strip}></span>
          <p className={style.text}>
            This book is being borrowed,
            do you want to go ahead and delete all data related to this book?
          </p>
        </div>
        <div className={style.action}>
          <button
            type="submit"
            className={style.btn}
            onClick={() => setConfirmDelete((prev) => ({
              ...prev, data: null, isOpen: false,
            }))}
          >
            <p className="text">Cancel</p>
            <box-icon name="x-circle" color="#ffffff"></box-icon>
          </button>
          <button
            type="submit"
            className={style.btn}
            onClick={handleDeleteBook}
          >
            <p className="text">Yes, Delete</p>
            <box-icon name="check-circle" color="#ffffff"></box-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
