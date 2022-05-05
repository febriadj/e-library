import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

import style from '../styles/pages/bookCatalog.css';
import * as comp0 from '../components';
import * as comp1 from '../components/bookCatalog';

function BookCatalogs() {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const [logoutIsOpen, setLogoutIsOpen] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    q: '',
  });

  const [pagInfo, setPagInfo] = useState({
    start: '',
    end: '',
    length: '',
  });

  const [confirmDelete, setConfirmDelete] = useState({
    data: null,
    isOpen: false,
  });

  const [addBookIsOpen, setAddBookIsOpen] = useState(false);
  const [updateBookIsOpen, setUpdateBookIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [infoboxData, setInfoboxData] = useState([]);
  const [details, setDetails] = useState({
    data: null,
    isOpen: false,
  });

  const [movePage, setMovePage] = useState({
    next: null,
    prev: null,
  });

  const handleGetBookCatalogs = async (args) => {
    try {
      const token = localStorage.getItem('token');
      const { q, page } = params;
      const url = isDev ? `http://localhost:8000/api/books?q=${q}&page=${page}&limit=${args}` : `/api/books?q=${q}&page=${page}&limit=${args}`;

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (!request.success) throw request;
      const { list, move, info } = request.data;

      setCatalogs(list);
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

  const handleChart = (args) => {
    const ctx = document.querySelector('canvas');
    const chartData = [...args.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))];

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map((item) => (
          item.title.length <= 16 ? item.title : item.title.substr(0, 16).trim().concat('...')
        )),
        datasets: [
          {
            label: 'Most Stock',
            backgroundColor: [
              '#434d5cbb', '#434d5c80',
            ],
            maxBarThickness: 80,
            data: chartData.map((item) => item.stock),
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return chart;
  }

  const handleInfoboxData = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/books' : '/api/books';

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      setInfoboxData(request.data);
      handleChart(request.data.sort((a, b) => b.stock - a.stock).slice(0, 3));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handlePagEnd = (event) => {
    localStorage.setItem('pag', JSON.stringify({
      member: pagLimit.member,
      book: parseInt(event.target.value),
      loan: pagLimit.loan,
    }));

    handleGetBookCatalogs(event.target.value);
  }

  useEffect(() => {
    document.title = 'E-Library - Book Catalog';

    handleInfoboxData();
    handleGetBookCatalogs(pagLimit.book);
  }, [params]);

  return (
    <div className={style.book}>
      { logoutIsOpen && <comp0.logout setLogoutIsOpen={setLogoutIsOpen} /> }
      <comp0.sidebar linkActive="book" />
      {
        addBookIsOpen && (
          <comp1.addBook
            setAddBookIsOpen={setAddBookIsOpen}
            handleGetBookCatalogs={handleGetBookCatalogs}
            handleInfoboxData={handleInfoboxData}
          />
        )
      }
      {
        updateBookIsOpen && (
          <comp1.updateBook
            setUpdateBookIsOpen={setUpdateBookIsOpen}
            handleGetBookCatalogs={handleGetBookCatalogs}
            handleInfoboxData={handleInfoboxData}
            book={updateData}
          />
        )
      }
      {
        details.isOpen && (
          <comp1.details
            setDetails={setDetails}
            data={details.data}
          />
        )
      }
      {
        confirmDelete.isOpen && (
          <comp1.confirmDelete
            data={confirmDelete.data}
            setConfirmDelete={setConfirmDelete}
            handleGetBookCatalogs={handleGetBookCatalogs}
            handleInfoboxData={handleInfoboxData}
          />
        )
      }
      <div className={style['book-wrap']}>
        <comp0.navbar
          path="Book Catalog"
          setLogoutIsOpen={setLogoutIsOpen}
        />
        <div className={style.top}>
          <comp1.infobox catalogs={infoboxData} />
        </div>
        <div className={style.bottom}>
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
              onClick={() => setAddBookIsOpen(true)}
            >
              <p className={style.text}>Add new book</p>
              <box-icon name="plus-circle" color="#ffffff"></box-icon>
            </button>
          </div>
          <div className={style.catalogs}>
            <comp1.table
              catalogs={catalogs}
              handleGetBookCatalogs={handleGetBookCatalogs}
              handleInfoboxData={handleInfoboxData}
              setUpdateData={setUpdateData}
              setUpdateBookIsOpen={setUpdateBookIsOpen}
              setDetails={setDetails}
              setConfirmDelete={setConfirmDelete}
            />
          </div>
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
                value={pagLimit.book}
                onChange={handlePagEnd}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>30</option>
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

export default BookCatalogs;
