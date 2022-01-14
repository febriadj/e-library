import React from 'react';
import moment from 'moment';

import style from '../../styles/components/bookCatalog/details.css';

function Details({
  details,
  setDetails,
}) {
  return (
    <div className={`${style.details} ${details.isOpen && style.active}`}>
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
            <span className={style.updated}>{`Updated ${moment(details?.data?.updatedAt).fromNow()}`}</span>
          </div>
        </div>
        <div className={style.main}>
          <table className={style.table}>
            <tbody>
              <tr className={style.row}>
                <td className={style.column}>Book Code</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{details?.data?.bookCode ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Title</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{details?.data?.title ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Author</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{details?.data?.author ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Publisher</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{details?.data?.publisher ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Stock</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{details?.data?.stock ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Published</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{moment(details?.data?.publicationDate).format('MMMM DD, YYYY') ?? ''}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Created At</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{moment(details?.data?.createdAt).format('MMMM DD, YYYY hh:mm A') ?? ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Details;
