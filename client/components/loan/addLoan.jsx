import React, { useState, useEffect } from 'react';
import style from '../../styles/components/loan/addLoan.css';

function AddLoan({
  setAddLoanIsOpen,
  handleGetLoans,
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
    bookCode: false,
    memberId: false,
    stock: false,
    deadline: false,
  });

  const [fields, setFields] = useState({
    bookCode: '',
    memberId: '',
    stock: '',
    deadline: '',
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

      if (!valid.deadline) {
        const newError = {
          message: 'Please fill out the form correctly',
        }
        throw newError;
      }

      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/loans' : '/api/loans';

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
        ...prev, bookCode: '', memberId: '', stock: '', deadline: '',
      }));

      setResponse((prev) => ({
        ...prev,
        success: true,
        message: request.message,
        active: true,
      }));

      handleGetLoans(pagLimit.loan);
      handleInfoboxData();

      setTimeout(() => {
        setAddLoanIsOpen(false);
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
    let mounted = true;

    if (mounted) {
      setValid((prev) => ({
        ...prev,
        bookCode: fields.bookCode.length === 12,
        memberId: fields.memberId.length === 9,
        stock: fields.stock > 0 && fields.stock <= 999,
        deadline: !!fields.deadline,
      }));
    }

    return () => {
      mounted = false;
    }
  }, [fields]);

  return (
    <div className={style.addloan}>
      <span
        className={style['close-area']}
        onClick={() => setAddLoanIsOpen(false)}
        aria-hidden="true"
      >
      </span>
      <div className={style['addloan-wrap']}>
        <div className={style.nav}>
          <div className={style.top}>
            <button
              type="button"
              className={style.btn}
              onClick={() => setAddLoanIsOpen(false)}
            >
              <box-icon name="arrow-back"></box-icon>
            </button>
            <h2 className={style.title}>Apply for a Loan</h2>
          </div>
          <p className={style.text}>
            Fill out all the available forms to apply for a book loan.
          </p>
        </div>
        <form method="post" className={style.form} onSubmit={handleSubmit}>
          <label className={style.fields} htmlFor="member-id">
            <div className={style.center}>
              <p className={style.label}>Membership ID</p>
              <input
                type="text"
                name="memberId"
                id="member-id"
                className={style.control}
                placeholder="enter 10 digit member id"
                onChange={handleChange}
                value={fields.memberId}
                required
              />
            </div>
            <box-icon
              name={valid.memberId ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.memberId ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="book-code">
            <div className={style.center}>
              <p className={style.label}>Book Code</p>
              <input
                type="text"
                name="bookCode"
                id="book-code"
                className={style.control}
                placeholder="character length must be more than 5 to 100"
                onChange={handleChange}
                value={fields.bookCode}
                required
              />
            </div>
            <box-icon
              name={valid.bookCode ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.bookCode ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="deadline-date">
            <div className={style.center}>
              <p className={style.label}>Deadline Date</p>
              <input
                type="date"
                name="deadline"
                id="deadline-date"
                className={style.control}
                onChange={handleChange}
                value={fields.deadline}
                required
              />
            </div>
            <box-icon
              name={valid.deadline ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.deadline ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="stock">
            <div className={style.center}>
              <p className={style.label}>Stock</p>
              <input
                type="number"
                name="stock"
                id="stock"
                className={style.control}
                placeholder="number of loans to add"
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
          <button type="submit" className={style['submit-btn']}>
            <p className={style.text}>Submit</p>
            <box-icon name="plus-circle" color="#ffffff"></box-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLoan;
