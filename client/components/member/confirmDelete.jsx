import React from 'react';
import style from '../../styles/components/member/confirmDelete.css';

import tableStyle from '../../styles/components/member/table.css';

function ConfirmDelete({
  data,
  setConfirmDelete,
  handleGetMembers,
}) {
  const isDev = process.env.NODE_ENV === 'development';

  const handleDeleteMember = async () => {
    const token = localStorage.getItem('token');
    const url = isDev ? 'http://localhost:8000/api/members' : '/api/members';

    const request = await (await fetch(url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: data.id,
      }),
    })).json();

    if (!request.success) throw request;

    setConfirmDelete((prev) => ({
      ...prev, data: null, isOpen: false,
    }));

    setTimeout(() => {
      const ctx = document.getElementsByClassName(tableStyle.row)[data.index];
      ctx.style = 'opacity: 0';

      setTimeout(() => {
        handleGetMembers();

        setTimeout(() => {
          ctx.style = 'opacity: 1';
        }, 500);
      }, 500);
    }, 500);
  }

  return (
    <div className={style['confirm-delete']}>
      <span
        className={style['close-area']}
        onClick={() => setConfirmDelete((prev) => ({
          ...prev,
          isOpen: false,
        }))}
        aria-hidden="true"
      >
      </span>
      <div className={style['confirm-delete-wrap']}>
        <div className={style.header}>
          <h2 className={style.title}>Confirm.</h2>
          <span className={style.strip}></span>
          <p className={style.text}>
            This member still has an active loan,
            do you want to delete it and ignore the loan status?
          </p>
        </div>
        <div className={style.action}>
          <button
            type="button"
            className={style.btn}
            onClick={() => setConfirmDelete((prev) => ({
              ...prev, data: null, isOpen: false,
            }))}
          >
            <p className="text">Cancel</p>
            <box-icon name="x-circle" color="#ffffff"></box-icon>
          </button>
          <button
            type="button"
            className={style.btn}
            onClick={handleDeleteMember}
          >
            <p className="text">Yes, Delete</p>
            <box-icon name="check-circle" color="#ffffff"></box-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
