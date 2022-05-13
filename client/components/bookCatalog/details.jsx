import React, { useState, useEffect } from 'react';
import moment from 'moment';

import style from '../../styles/components/bookCatalog/details.css';
import handleGetLoan from '../../helpers/handleGetLoan';

function Details({
  data,
  setDetails,
}) {
  const [loanLength, setLoanLength] = useState(0);

  useEffect(async () => {
    const loan = await handleGetLoan(data.bookCode);
    setLoanLength(loan.length);
  }, []);

  return (
    <div className={style.details}>
      <span
        className={style['close-area']}
        onClick={() => setDetails((prev) => ({
          ...prev,
          isOpen: false,
        }))}
        aria-hidden="true"
      >
      </span>
      <div className={style['details-wrap']}>
        <div className={style.nav}>
          <div className={style.top}>
            <button
              type="button"
              className={style.btn}
              onClick={() => setDetails((prev) => ({
                ...prev, isOpen: false,
              }))}
            >
              <box-icon name="arrow-back"></box-icon>
            </button>
            <h2 className={style.title}>Book Details</h2>
            <span className={style.updated}>{`Updated ${moment(data?.updatedAt).fromNow()}`}</span>
          </div>
        </div>
        <div className={style.main}>
          <table className={style.table}>
            <tbody>
              <tr className={style.row}>
                <td className={style.column}>Book Code</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data?.bookCode ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Book Title</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data?.title ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Author</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data?.author ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Publisher</td>
                <td className={style.column}>:</td>
                <td className={style.column}>
                  <span className={style['publisher-name']}>{data?.publisher ? data.publisher : 'Unknown'}</span>
                  <span>{` (${moment(data?.publicationDate).format('MMMM DD, YYYY') ?? ''})`}</span>
                </td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Stock</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data?.stock ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Created At</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{moment(data?.createdAt).format('MMMM DD, YYYY hh:mma') ?? ''}</td>
              </tr>
            </tbody>
          </table>
          <div className={style.info}>
            <box-icon name="info-circle"></box-icon>
            {
              loanLength > 0
                ? <p>{`This book is being borrowed by  ${loanLength} members`}</p>
                : <p>No one is currently borrowing this book</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
