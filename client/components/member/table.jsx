import React from 'react';
import style from '../../styles/components/member/table.css';

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

  const formatDate = (args) => {
    const date = new Date(args).toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return date;
  }

  const handleGetLoan = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? `http://localhost:8000/api/loans?q=${args.id}` : `/api/loans${args.id}`;

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (!request.success || request.data.length > 0) throw request;
      return true;
    }
    catch (error0) {
      return false;
    }
  }

  const handleDeleteMember = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/members' : '/api/members';

      const loan = await handleGetLoan(args);
      if (!loan) throw loan;

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
        handleGetMembers();

        setTimeout(() => {
          ctx.style = 'opacity: 1';
        }, 500);
      }, 1000);
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
          <td className={style.column}>Address</td>
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
              <td className={style.column} onClick={() => handleSetDetailsMember(item)} aria-hidden="true">{item.address}</td>
              <td className={style.column} onClick={() => handleSetDetailsMember(item)} aria-hidden="true">{formatDate(item.createdAt)}</td>
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
