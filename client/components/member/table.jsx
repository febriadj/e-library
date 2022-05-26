import React from 'react';
import moment from 'moment';

import style from '../../styles/components/member/table.css';
import handleGetLoan from '../../helpers/handleGetLoan';

function Table({
  members,
  handleGetMembers,
  setUpdate,
  setUpdateMemberIsOpen,
  setDetails,
  setDetailsIsOpen,
  setConfirmDelete,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const handleDeleteMember = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/members' : '/api/members';

      const loan = await handleGetLoan(args.id);
      if (loan.length > 0) throw loan;

      const request = await (await fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: args.id,
        }),
      })).json();

      if (!request.success) throw request;

      const ctx = document.getElementsByClassName(style.row)[args.index];
      ctx.style = 'opacity: 0';

      setTimeout(() => {
        handleGetMembers(pagLimit.member);

        setTimeout(() => {
          ctx.style = 'opacity: 1';
        }, 500);
      }, 500);
    }
    catch (error0) {
      setConfirmDelete((prev) => ({
        ...prev, data: args, isOpen: true,
      }));
    }
  }

  const handleSetUpdateMember = (args) => {
    setUpdate((prev) => ({
      ...prev, ...args,
    }));

    setUpdateMemberIsOpen(true);
  }

  const handleSetDetailsMember = (args) => {
    setDetails((prev) => ({
      ...prev, ...args,
    }));

    setDetailsIsOpen(true);
  }

  return (
    <table className={style.table}>
      <thead className={style.thead}>
        <tr className={style.row}>
          <td className={style.column}>No</td>
          <td className={style.column}>ID</td>
          <td className={style.column}>Document ID</td>
          <td className={style.column}>Full Name</td>
          <td className={style.column}>Phone</td>
          <td className={style.column}>Email</td>
          <td className={style.column}>Join Date</td>
          <td className={`${style.column} ${style.action}`}>Action</td>
        </tr>
      </thead>
      <tbody className={style.tbody}>
        {
          members.map((item, index) => (
            <tr className={style.row} key={item.id}>
              <td className={style.column} onClick={() => handleSetDetailsMember(item)} aria-hidden="true">{index + 1}</td>
              <td className={style.column} onClick={() => handleSetDetailsMember(item)} aria-hidden="true">{item.id}</td>
              <td className={style.column} onClick={() => handleSetDetailsMember(item)} aria-hidden="true">{item.documentId}</td>
              <td className={style.column} onClick={() => handleSetDetailsMember(item)} aria-hidden="true">{`${item.firstname} ${item.lastname}`}</td>
              <td className={style.column} onClick={() => handleSetDetailsMember(item)} aria-hidden="true">{item.phone}</td>
              <td
                className={style.column}
                onClick={() => handleSetDetailsMember(item)}
                aria-hidden="true"
              >
                {item.email || item.email.length > 0 ? item.email : '-'}
              </td>
              <td className={style.column} onClick={() => handleSetDetailsMember(item)} aria-hidden="true">{moment(item.createdAt).format('ll')}</td>
              <td className={`${style.column} ${style.action}`}>
                <button
                  type="button"
                  className={style.btn}
                  onClick={() => handleSetUpdateMember(item)}
                >
                  <box-icon name="pencil"></box-icon>
                </button>
                <button
                  type="button"
                  className={style.btn}
                  onClick={() => handleDeleteMember({
                    index: index + 1,
                    id: item.id,
                  })}
                >
                  <box-icon name="trash"></box-icon>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
