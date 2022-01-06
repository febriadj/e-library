import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

import style from '../styles/pages/loan.css';
import * as comp0 from '../components';
import * as comp1 from '../components/loan';

function Loan() {
  const isDev = process.env.NODE_ENV === 'development';

  const [logoutIsOpen, setLogoutIsOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const [addLoanIsOpen, setAddLoanIsOpen] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    q: '',
  });

  const handleChart = (args) => {
    const ctx = document.querySelector('canvas');
    const chartData = [...args.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))];

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map((item) => item.id),
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
        responsive: false,
        scales: {
          x: {
            ticks: {
              display: false,
            },
          },
        },
      },
    });

    return chart;
  }

  const handleGetLoans = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/loans' : '/api/loans';

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (!request.success) throw request;

      setLoans(request.data);
      handleChart(request.data.sort((a, b) => b.stock - a.stock).slice(0, 5));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    document.title = 'E-Library - Loan'
    handleGetLoans();
  }, [params]);

  return (
    <div className={style.loan}>
      { logoutIsOpen && <comp0.logout setLogoutIsOpen={setLogoutIsOpen} /> }
      <comp0.sidebar linkActive="loan" />
      <comp1.addLoan
        setAddLoanIsOpen={setAddLoanIsOpen}
        addLoanIsOpen={addLoanIsOpen}
        handleGetLoans={handleGetLoans}
      />
      <div className={style['loan-wrap']}>
        <comp0.navbar
          path="Loan"
          setLogoutIsOpen={setLogoutIsOpen}
        />
        <div className={style.top}>
          <comp1.infobox loans={loans} />
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
              onClick={() => setAddLoanIsOpen(true)}
            >
              <p className={style.text}>Apply Loan</p>
              <box-icon name="plus-circle" color="#ffffff"></box-icon>
            </button>
          </div>
          <comp1.table loans={loans} />
        </div>
      </div>
    </div>
  );
}

export default Loan;
