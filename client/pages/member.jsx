import React, { useState, useEffect } from 'react';

import style from '../styles/pages/member.css';
import * as comp0 from '../components';
import * as comp1 from '../components/member';

function Member() {
  const isDev = process.env.NODE_ENV === 'development';

  const [logoutIsOpen, setLogoutIsOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [addMemberIsOpen, setAddMemberIsOpen] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    q: '',
  });

  const [pagInfo, setPagInfo] = useState({
    start: '',
    end: '',
    length: '',
  });

  const [movePage, setMovePage] = useState({
    next: null,
    prev: null,
  });

  const handleGetMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { q, page, limit } = params;
      const url = isDev ? `http://localhost:8000/api/members?q=${q}&page=${page}&limit=${limit}` : `/api/members?q=${q}&page=${page}&limit=${limit}`;

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (!request.success) throw request;
      const { list, move, info } = request.data;

      setMembers(list);
      setMovePage((prev) => ({
        ...prev, prev: move.prev, next: move.next,
      }));

      setPagInfo((prev) => ({
        ...prev,
        start: info.start,
        end: info.end,
        length: info.length,
      }));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    document.title = 'E-Library - Member'
    handleGetMembers();
  }, [params]);

  return (
    <div className={style.member}>
      { logoutIsOpen && <comp0.logout setLogoutIsOpen={setLogoutIsOpen} /> }
      <comp0.sidebar linkActive="member" />
      <comp1.addMember
        setAddMemberIsOpen={setAddMemberIsOpen}
        addMemberIsOpen={addMemberIsOpen}
        handleGetMembers={handleGetMembers}
      />
      <div className={style['member-wrap']}>
        <comp0.navbar
          path="Member"
          setLogoutIsOpen={setLogoutIsOpen}
        />
        <div className={style.main}>
          <div className={style.header}>
            <div className={style['search-bar']}>
              <box-icon name="search-alt"></box-icon>
              <input
                type="text"
                name="q"
                placeholder="Enter the title of the book you want to search"
                onChange={(event) => (
                  setParams((prev) => ({
                    ...prev,
                    q: event.target.value,
                  }))
                )}
                value={params.q}
              />
            </div>
            <button
              type="button"
              className={style['add-btn']}
              onClick={() => setAddMemberIsOpen(true)}
            >
              <p className={style.text}>Add Member</p>
              <box-icon name="plus-circle" color="#ffffff"></box-icon>
            </button>
          </div>
          <comp1.table members={members} />
          <div className={style.pagination}>
            <div className={style.move}>
              <button
                type="button"
                className={`${style.btn} ${movePage.prev ? style.active : null}`}
                onClick={() => (
                  movePage.prev && setParams((prev) => ({
                    ...prev,
                    page: movePage.prev,
                  }))
                )}
              >
                <box-icon name="chevron-left" color="#ffffff"></box-icon>
              </button>
              <button
                type="button"
                className={`${style.btn} ${movePage.next ? style.active : null}`}
                onClick={() => (
                  movePage.next && setParams((prev) => ({
                    ...prev,
                    page: movePage.next,
                  }))
                )}
              >
                <box-icon name="chevron-right" color="#ffffff"></box-icon>
              </button>
            </div>
            <div className={style.limit}>
              <select name="limit" className={style['select-limit']}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <p className={style.text}>rows per page</p>
            </div>
            <p className={style.info}>{`${pagInfo.start + 1} - ${pagInfo.end} of ${pagInfo.length}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Member;
