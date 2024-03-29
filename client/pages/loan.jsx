import React, { useState, useEffect } from 'react';

import style from '../styles/pages/loan.css';
import styleInfobox from '../styles/components/loan/infobox.css';

import * as comp0 from '../components';
import * as comp1 from '../components/loan';
import handleChart from '../helpers/handleChart';

function Loan() {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const [loans, setLoans] = useState([]);
  const [addLoanIsOpen, setAddLoanIsOpen] = useState(false);
  const [infoboxData, setInfoboxData] = useState([]);

  const [modal, setModal] = useState({
    deleteAccount: false,
    changePassword: false,
    logout: false,
    profile: false,
  });

  const [details, setDetails] = useState({
    data: null,
    isOpen: false,
  });

  const [updateLoan, setUpdateLoan] = useState({
    data: null,
    isOpen: false,
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

  const handleGetLoans = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const { q, page } = params;
      const url = isDev ? `http://localhost:8000/api/loans?q=${q}&page=${page}&limit=${args}` : `/api/loans?q=${q}&page=${page}&limit=${args}`;

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (!request.success) throw request;
      const { list, move, info } = request.data;

      setLoans(list);
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

  const handleInfoboxData = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/loans' : '/api/loans';

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      setInfoboxData(request.data);
      handleChart({
        label: 'id',
        ctx: document.querySelector(`.${styleInfobox.canvas}`),
        payload: request.data.sort((a, b) => b.stock - a.stock).slice(0, 5),
        datasets: {
          label: 'fullname',
          data: 'stock',
        },
      });
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handlePagEnd = (event) => {
    localStorage.setItem('pag', JSON.stringify({
      member: pagLimit.member,
      book: pagLimit.book,
      loan: parseInt(event.target.value),
    }));

    handleGetLoans(event.target.value);
  }

  useEffect(() => {
    document.title = 'E-Library - Loan';

    handleInfoboxData();
  }, []);

  useEffect(() => {
    handleGetLoans(pagLimit.loan);
  }, [params]);

  return (
    <div className={style.loan}>
      <comp0.sidebar linkActive="loan" />
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
        addLoanIsOpen && (
          <comp1.addLoan
            setAddLoanIsOpen={setAddLoanIsOpen}
            handleGetLoans={handleGetLoans}
            handleInfoboxData={handleInfoboxData}
          />
        )
      }
      {
        updateLoan.isOpen && (
          <comp1.updateLoan
            data={updateLoan.data}
            handleGetLoans={handleGetLoans}
            setUpdateLoan={setUpdateLoan}
          />
        )
      }
      {
        details.isOpen && (
          <comp1.details
            handleGetLoans={handleGetLoans}
            details={details}
            setDetails={setDetails}
          />
        )
      }
      <div className={style['loan-wrap']}>
        <comp0.navbar
          path="Loan"
          setModal={setModal}
        />
        <div className={style.top}>
          <comp1.infobox loans={infoboxData} />
        </div>
        <div className={style.bottom}>
          <div className={style.header}>
            <div className={style['search-bar']}>
              <box-icon name="search-alt"></box-icon>
              <input
                type="text"
                name="q"
                placeholder="Enter the member id or code of the book you want to search"
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
              onClick={() => setAddLoanIsOpen(true)}
            >
              <p className={style.text}>Apply Loan</p>
              <box-icon name="plus-circle" color="#ffffff"></box-icon>
            </button>
          </div>
          <comp1.table
            handleGetLoans={handleGetLoans}
            loans={loans}
            handleInfoboxData={handleInfoboxData}
            setUpdateLoan={setUpdateLoan}
            setDetails={setDetails}
            page={params.page}
          />
          <div className={style.pagination}>
            <div className={style.move}>
              <button
                type="button"
                className={`${style.btn} ${movePage.prev ? style.active : null}`}
                onClick={() => {
                  if (movePage.prev) {
                    setParams((prev) => ({
                      ...prev,
                      page: movePage.prev,
                    }));
                  }
                }}
              >
                <box-icon name="chevron-left" color="#ffffff"></box-icon>
              </button>
              <button
                type="button"
                className={`${style.btn} ${movePage.next ? style.active : null}`}
                onClick={() => {
                  if (movePage.next) {
                    setParams((prev) => ({
                      ...prev,
                      page: movePage.next,
                    }));
                  }
                }}
              >
                <box-icon name="chevron-right" color="#ffffff"></box-icon>
              </button>
            </div>
            <div className={style.limit}>
              <select
                name="limit"
                className={style['select-limit']}
                value={pagLimit.loan}
                onChange={handlePagEnd}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
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

export default Loan;
