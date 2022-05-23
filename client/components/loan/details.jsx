import React from 'react';
import moment from 'moment';

import style from '../../styles/components/loan/details.css';

function Details({
  details,
  setDetails,
}) {
  const expired = () => new Date(details.data.deadline) < new Date();

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
            <h2 className={style.title}>Loan Details</h2>
            <span className={style.updated}>{`Updated ${moment(details?.data?.updatedAt).fromNow()}`}</span>
          </div>
        </div>
        <div className={style.main}>
          <table className={style.table}>
            <tbody>
              <tr className={style.row}>
                <td className={style.column}>Member</td>
                <td className={style.column}>:</td>
                <td className={style.column}>
                  <span>{details.data.memberId}</span>
                  <span>{` (${details.data.fullname})`}</span>
                </td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Book Code</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{details.data.bookCode}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Book Title</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{details.data.bookTitle}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Stock</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{details.data.stock}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Since</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{moment(details.data.createdAt).format('LL')}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Deadline</td>
                <td className={style.column}>:</td>
                <td className={style.column}>
                  <span></span>{moment(details.data.deadline).format('LL')}
                  <span className={`${style.deadline} ${expired() && style.expired}`}>
                    {expired() ? 'Expired' : 'Active'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" className={style['loan-btn']}>
            <p>No one is currently borrowing this book</p>
            <box-icon name="right-top-arrow-circle"></box-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
