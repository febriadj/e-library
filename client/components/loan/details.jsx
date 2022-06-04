import React, { useState } from 'react';
import moment from 'moment';

import style from '../../styles/components/loan/details.css';
import PerStock from './deletePerStock';

function Details({
  handleGetLoans,
  details,
  setDetails,
}) {
  const [perStockIsOpen, setPerStockIsOpen] = useState(false);
  const expired = () => new Date(details.data.deadline) < new Date();

  const [currentStock, setCurrentStock] = useState(details.data.stock);

  return (
    <div className={style.details}>
      <span
        className={style['close-area']}
        onClick={() => setDetails((prev) => ({
          ...prev,
          isOpen: false,
          data: null,
        }))}
        aria-hidden="true"
      >
      </span>
      <div className={style['details-wrap']}>
        {
          perStockIsOpen && (
            <PerStock
              setCurrentStock={setCurrentStock}
              setDetails={setDetails}
              data={{
                id: details.data.id,
                currentStock,
              }}
              setPerStockIsOpen={setPerStockIsOpen}
              handleGetLoans={handleGetLoans}
            />
          )
        }
        <div className={style.nav}>
          <div className={style.top}>
            <button
              type="button"
              className={style.btn}
              onClick={() => setDetails((prev) => ({
                ...prev,
                isOpen: false,
                data: null,
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
                <td className={style.column}>{currentStock}</td>
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
          <button
            type="button"
            className={style['loan-btn']}
            onClick={() => setPerStockIsOpen(true)}
          >
            <p>Delete Loan per Stock</p>
            <box-icon name="right-top-arrow-circle"></box-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
