import React, { useState } from 'react';
import style from '../../styles/components/loan/deletePerStock.css';

function DeletePerStock({
  setCurrentStock,
  setDetails,
  data,
  setPerStockIsOpen,
  handleGetLoans,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const [amount, setAmount] = useState('');
  const [valid, setValid] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/loans' : '/api/loans';

      const request = await (await fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: data.id,
          stock: amount,
        }),
      })).json();

      if (!request.success) throw request;
      handleGetLoans(pagLimit.loan);

      setCurrentStock((prev) => prev - amount);
      setPerStockIsOpen(false);

      if (data.currentStock - amount === 0) {
        setTimeout(() => {
          setDetails((prev) => ({
            ...prev,
            data: null,
            isOpen: false,
          }));
        }, 500);
      }
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  return (
    <div className={style.perstock}>
      <span
        className={style['close-area']}
        onClick={() => setPerStockIsOpen(false)}
        aria-hidden="true"
      >
      </span>
      <div className={style['perstock-wrap']}>
        <form method="delete" className={style.form} onSubmit={handleSubmit}>
          <span className={style.field}>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Stock amount"
              min={0}
              max={data.currentStock}
              value={amount}
              onChange={(event) => {
                const { value, max } = event.target;
                setAmount(value);

                if (value <= max && value > 0) {
                  setValid(true);
                } else {
                  setValid(false);
                }
              }}
            />
            <box-icon
              className={style.valid}
              name={valid ? 'check-circle' : 'x-circle'}
              color={valid ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </span>
          <button type="submit">
            <box-icon name="right-arrow-alt"></box-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeletePerStock;
