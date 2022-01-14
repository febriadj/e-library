import React from 'react';
import moment from 'moment';

import style from '../../styles/components/member/details.css';

function Details({
  detailsIsOpen,
  setDetailsIsOpen,
  member,
}) {
  return (
    <div className={`${style.details} ${detailsIsOpen && style.active}`}>
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
            <span className={style.updated}>{`Updated ${moment(member.updatedAt).fromNow()}`}</span>
          </div>
        </div>
        <div className={style.main}>
          <table className={style.table}>
            <tbody>
              <tr className={style.row}>
                <td className={style.column}>Member ID</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{member.id}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Document ID</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{member.documentId}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Full Name</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{`${member.firstname} ${member.lastname}`}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Email</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{member.email}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Phone</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{member.phone}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Address</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{member.address}</td>
              </tr>
              <tr className={style.row}>
                <td className={style.column}>Join Date</td>
                <td className={style.column}>:</td>
                <td className={style.column}>{moment(member.createdAt).format('MMMM DD, YYYY')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Details;
