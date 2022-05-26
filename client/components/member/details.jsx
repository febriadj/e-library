import React from 'react';
import moment from 'moment';

import style from '../../styles/components/member/details.css';

function Details({
  setDetailsIsOpen,
  data,
}) {
  return (
    <div className={style.details}>
      <span
        className={style['close-area']}
        onClick={() => setDetailsIsOpen(false)}
        aria-hidden="true"
      >
      </span>
      <div className={style['details-wrap']}>
        <div className={style.nav}>
          <div className={style.top}>
            <button
              type="button"
              className={style.btn}
              onClick={() => setDetailsIsOpen(false)}
            >
              <box-icon name="arrow-back"></box-icon>
            </button>
            <h2 className={style.title}>Membership Card</h2>
            <span className={style.updated}>{`Updated ${moment(data.updatedAt).fromNow()}`}</span>
          </div>
        </div>
        <div className={style.main}>
          <table className={style.table}>
            <tbody>
              <tr className={style.row}>
                <td className={style.column}>Member ID</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data.id}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Document ID</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data.documentId}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Full Name</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{`${data.firstname} ${data.lastname}`}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Email</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data.email || data.email.length > 0 ? data.email : '-'}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Phone</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data.phone}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Address</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{data.address}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Join Date</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{moment(data.createdAt).format('LL')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Details;
