import React, { useState, useEffect } from 'react';

import style from '../styles/pages/member.css';
import * as comp0 from '../components';
import * as comp1 from '../components/member';

function Member() {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const [members, setMembers] = useState([]);
  const [addMemberIsOpen, setAddMemberIsOpen] = useState(false);
  const [updateMemberIsOpen, setUpdateMemberIsOpen] = useState(false);
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);

  const [modal, setModal] = useState({
    deleteAccount: false,
    changePassword: false,
    logout: false,
    profile: false,
  });

  const [confirmDelete, setConfirmDelete] = useState({
    data: null,
    isOpen: false,
  });

  const [details, setDetails] = useState({
    id: '',
    documentId: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
  });

  const [update, setUpdate] = useState({
    id: '',
    documentId: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
  });

  const [params, setParams] = useState({
    page: 1,
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

  const handleGetMembers = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const { q, page } = params;
      const url = isDev ? `http://localhost:8000/api/members?q=${q}&page=${page}&limit=${args}` : `/api/members?q=${q}&page=${page}&limit=${args}`;

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
    document.title = 'E-Library - Member';
  }, []);

  useEffect(() => {
    handleGetMembers(pagLimit.member);
  }, [params]);

  return (
    <div className={style.member}>
      <comp0.sidebar linkActive="member" />
      { modal.logout && <comp0.logout setModal={setModal} /> }
      { modal.deleteAccount && (<comp0.deleteAccount setModal={setModal} />) }
      { modal.changePass && (<comp0.changePass setModal={setModal} />) }
      {
        modal.profile && (
          <comp0.profile
            setModal={setModal}
          />
        )
      }
      {
        addMemberIsOpen && (
          <comp1.addMember
            setAddMemberIsOpen={setAddMemberIsOpen}
            handleGetMembers={handleGetMembers}
          />
        )
      }
      {
        updateMemberIsOpen && (
          <comp1.updateMember
            updateMemberIsOpen={updateMemberIsOpen}
            setUpdateMemberIsOpen={setUpdateMemberIsOpen}
            member={update}
            handleGetMembers={handleGetMembers}
          />
        )
      }
      {
        detailsIsOpen && (
          <comp1.details
            detailsIsOpen={detailsIsOpen}
            setDetailsIsOpen={setDetailsIsOpen}
            data={details}
          />
        )
      }
      {
        confirmDelete.isOpen && (
          <comp1.confirmDelete
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
            handleGetMembers={handleGetMembers}
          />
        )
      }
      <div className={style['member-wrap']}>
        <comp0.navbar
          path="Member"
          setModal={setModal}
        />
        <div className={style.main}>
          <div className={style.header}>
            <div className={style['search-bar']}>
              <box-icon name="search-alt"></box-icon>
              <input
                type="text"
                name="q"
                placeholder="Enter the ID or name of the member you want to search"
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
          <comp1.table
            members={members}
            handleGetMembers={handleGetMembers}
            setUpdate={setUpdate}
            setUpdateMemberIsOpen={setUpdateMemberIsOpen}
            setDetails={setDetails}
            setDetailsIsOpen={setDetailsIsOpen}
            setConfirmDelete={setConfirmDelete}
          />
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
              <select
                name="limit"
                className={style['select-limit']}
                value={pagLimit.member}
                onChange={(event) => {
                  localStorage.setItem('pag', JSON.stringify({
                    member: parseInt(event.target.value),
                    book: pagLimit.book,
                    loan: pagLimit.loan,
                  }));

                  handleGetMembers(event.target.value);
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
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
