import React, { useState, useEffect } from 'react';

import style from '../styles/pages/bookCatalog.css';
import * as comp0 from '../components';
import * as comp1 from '../components/bookCatalog';

function BookCatalogs() {
  const isDev = process.env.NODE_ENV === 'development';
  const [query, setQuery] = useState('');

  const [catalogs, setCatalogs] = useState([]);
  const [addBookIsOpen, setAddBookIsOpen] = useState(false);

  const handleGetBookCatalogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? `http://localhost:8000/api/books?q=${query}` : `/api/books?q=${query}`;

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (!request.success) throw request;
      setCatalogs(request.data);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    document.title = 'E-library - Book Catalog';
  });

  useEffect(() => {
    handleGetBookCatalogs();
  }, [query]);

  return (
    <div className={style.book}>
      <comp0.sidebar
        linkActive="book"
      />
      <comp1.addBook
        setAddBookIsOpen={setAddBookIsOpen}
        addBookIsOpen={addBookIsOpen}
        handleGetBookCatalogs={handleGetBookCatalogs}
      />
      <div className={style['book-wrap']}>
        <comp0.navbar
          path="bookCatalog"
        />
        <div className={style.top}><p>top</p></div>
        <div className={style.bottom}>
          <div className={style.header}>
            <div className={style['search-bar']}>
              <box-icon name="search-alt"></box-icon>
              <input
                type="text"
                name="search"
                placeholder="Enter the title of the book you want to search"
                onChange={(event) => setQuery(event.target.value)}
                value={query}
              />
            </div>
            <button
              type="button"
              className={style['add-btn']}
              onClick={() => setAddBookIsOpen(true)}
            >
              <p className={style.text}>Add new book</p>
              <box-icon name="plus-circle" color="#ffffff"></box-icon>
            </button>
          </div>
          <div className={style.catalogs}>
            <comp1.table
              catalogs={catalogs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCatalogs;
