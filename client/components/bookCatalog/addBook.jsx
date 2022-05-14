import React, { useState, useEffect } from 'react';
import style from '../../styles/components/bookCatalog/addBook.css';

function AddBook({
  setAddBookIsOpen,
  handleGetBookCatalogs,
  handleInfoboxData,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const [response, setResponse] = useState({
    success: false,
    message: '',
    active: false,
  });

  const [valid, setValid] = useState({
    title: false,
    author: false,
    publisher: false,
    stock: false,
  });

  const [fields, setFields] = useState({
    title: '',
    author: '',
    publisher: '',
    stock: '',
    publicationDate: '',
  });

  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (
        !valid.title
        || !valid.author
        || !valid.stock
      ) {
        const newError = {
          message: 'Please fill out the form correctly',
        }
        throw newError;
      }

      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/books' : '/api/books';

      const request = await (await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fields),
      })).json();

      if (!request.success) throw request;

      setFields((prev) => ({
        ...prev, title: '', author: '', publisher: '', stock: '', publicationDate: '',
      }));

      setResponse((prev) => ({
        ...prev,
        success: true,
        message: request.message,
        active: true,
      }));

      handleGetBookCatalogs(pagLimit.book);
      handleInfoboxData();

      setTimeout(() => {
        setAddBookIsOpen(false);
        setResponse((prev) => ({
          ...prev, message: '', active: false,
        }));
      }, 1000);
    }
    catch (error0) {
      setResponse((prev) => ({
        ...prev,
        success: false,
        message: error0.message,
        active: true,
      }));
    }
  }

  useEffect(() => {
    setValid((prev) => ({
      ...prev,
      title: fields.title.length >= 5 && fields.title.length <= 100,
      author: fields.author.length >= 3 && fields.author.length <= 30,
      stock: fields.stock > 0 && fields.stock <= 999,
    }));
  }, [fields]);

  return (
    <div className={style.addbook}>
      <span
        className={style['close-area']}
        onClick={() => setAddBookIsOpen(false)}
        aria-hidden="true"
      >
      </span>
      <div className={style['addbook-wrap']}>
        <div className={style.nav}>
          <div className={style.top}>
            <button
              type="button"
              className={style.btn}
              onClick={() => setAddBookIsOpen(false)}
            >
              <box-icon name="arrow-back"></box-icon>
            </button>
            <h2 className={style.title}>Add New Book</h2>
          </div>
          <p className={style.text}>
            Fill out all the available forms to register a new book into the library
          </p>
        </div>
        <form method="post" className={style.form} onSubmit={handleSubmit}>
          <label className={style.fields} htmlFor="title">
            <div className={style.center}>
              <p className={style.label}>Book Title</p>
              <input
                type="text"
                name="title"
                id="title"
                className={style.control}
                placeholder="character length must be more than 5 to 100"
                onChange={handleChange}
                value={fields.title}
                required
              />
            </div>
            <box-icon
              name={valid.title ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.title ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="author">
            <div className={style.center}>
              <p className={style.label}>Author</p>
              <input
                type="text"
                name="author"
                id="author"
                className={style.control}
                placeholder="character length must be more than 3 to 30"
                onChange={handleChange}
                value={fields.author}
                required
              />
            </div>
            <box-icon
              name={valid.author ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.author ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="publisher">
            <div className={style.center}>
              <p className={style.label}>Publisher</p>
              <input
                type="text"
                name="publisher"
                id="publisher"
                className={style.control}
                placeholder="character length must be more than 3 to 30"
                onChange={handleChange}
                value={fields.publisher}
              />
            </div>
          </label>
          <label className={style.fields} htmlFor="stock">
            <div className={style.center}>
              <p className={style.label}>Stock</p>
              <input
                type="number"
                name="stock"
                id="stock"
                className={style.control}
                placeholder="number of books to add"
                onChange={handleChange}
                value={fields.stock}
                required
              />
            </div>
            <box-icon
              name={valid.stock ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.stock ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="publication-date">
            <div className={style.center}>
              <p className={style.label}>Publication Date</p>
              <input
                type="date"
                name="publicationDate"
                id="publication-date"
                className={style.control}
                onChange={handleChange}
                value={fields.publicationDate}
                required
              />
            </div>
          </label>
          <span className={style.response}>
            { response.active && (
              <box-icon
                name={response.success ? 'check-circle' : 'x-circle'}
                color={response.success ? '#188c94' : '#9B0000'}
              >
              </box-icon>
            ) }
            <p className={style.text}>{response.message}</p>
          </span>
          <button type="submit" className={`g-btn ${style['submit-btn']}`}>
            <p className={style.text}>Submit</p>
            <box-icon name="plus-circle" color="#ffffff"></box-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
