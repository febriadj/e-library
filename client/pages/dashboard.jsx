import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

import moment from 'moment';
import style from '../styles/pages/dashboard.css';

import * as comp0 from '../components';

function Dashboard() {
  const isDev = process.env.NODE_ENV === 'development';
  const token = localStorage.getItem('token');

  const [monitor, setMonitor] = useState({
    members: { len: 0, sen: 0 },
    books: { len: 0, sen: 0 },
    loans: { len: 0, sen: 0 },
  });

  const [modal, setModal] = useState({
    deleteAccount: false,
    changePassword: false,
    logout: false,
    profile: false,
  });

  const handleGetMonitorData = async (args) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const [m, b, l] = await Promise.all([
        (await fetch(isDev ? 'http://localhost:8000/api/members' : '/api/members', options)).json(),
        (await fetch(isDev ? 'http://localhost:8000/api/books' : '/api/books', options)).json(),
        (await fetch(isDev ? 'http://localhost:8000/api/loans' : '/api/loans', options)).json(),
      ]);

      const handleSen = (args2) => {
        const reduced = args2.reduce((acc, curr) => acc + curr);

        if (reduced === 0) return 0.00 * 100;
        return (((args2[args2.length - 1] / reduced) * 1.00) * 100).toFixed(1);
      }

      setMonitor((prev) => ({
        ...prev,
        members: {
          sen: handleSen(args.members),
          len: m.data.length,
        },
        books: {
          sen: handleSen(args.books),
          len: b.data.length,
        },
        loans: {
          sen: handleSen(args.loans),
          len: l.data.length,
        },
      }));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handleChart = ({ days, payload }) => {
    const ctx = document.querySelector(`.${style.canvas}`);
    const chartStatus = Chart.getChart(ctx);

    if (chartStatus) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...days.map((item) => moment(item).format('dddd'))],
        datasets: [
          {
            label: 'Member Activity',
            backgroundColor: '#188c94',
            borderColor: '#188c94',
            data: payload.members.map((item) => item),
            tension: 0.2,
          },
          {
            label: 'Book Activity',
            backgroundColor: '#434d5c',
            borderColor: '#434d5c',
            data: payload.books.map((item) => item),
            tension: 0.2,
          },
          {
            label: 'Loan Activity',
            backgroundColor: '#ff335f',
            borderColor: '#ff335f',
            data: payload.loans.map((item) => item),
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return chart;
  }

  const handleGetActivities = async () => {
    try {
      const url = isDev ? 'http://localhost:8000/api/activities' : '/api/activities';
      const req = await (await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (!req.success) throw req;

      handleChart(req.data);
      handleGetMonitorData(req.data.payload);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    document.title = 'E-Library - Dashboard';
    handleGetActivities();
  }, []);

  return (
    <div className={style.dashboard}>
      <comp0.sidebar linkActive="dashboard" />
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
      <div className={style['dashboard-wrap']}>
        <comp0.navbar
          setModal={setModal}
        />
        <div className={style.top}>
          <div className={style.monitor}>
            <div className={style.box}>
              <span className={style.info}>
                <p>Members</p>
                <h1 className={style.num}>
                  {monitor.members.len > 0 && monitor.members.len < 10 && 0}
                  {monitor.members.len}
                </h1>
                <p>{monitor.members.sen}% of today's activity in 1 week</p>
              </span>
              <span className={style.icon}>
                <box-icon name="group"></box-icon>
              </span>
            </div>
            <div className={style.box}>
              <span className={style.info}>
                <p>Book Catalogs</p>
                <h1 className={style.num}>
                  {monitor.books.len > 0 && monitor.books.len < 10 && 0}
                  {monitor.books.len}
                </h1>
                <p>{monitor.books.sen}% of today's activity in 1 week</p>
              </span>
              <span className={style.icon}>
                <box-icon name="book"></box-icon>
              </span>
            </div>
            <div className={style.box}>
              <span className={style.info}>
                <p>Book Loans</p>
                <h1 className={style.num}>
                  {monitor.loans.len > 0 && monitor.loans.len < 10 && 0}
                  {monitor.loans.len}
                </h1>
                <p>{monitor.loans.sen}% of today's activity in 1 week</p>
              </span>
              <span className={style.icon}>
                <box-icon name="shopping-bag"></box-icon>
              </span>
            </div>
          </div>
        </div>
        <div className={style.bottom}>
          <canvas className={style.canvas}></canvas>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
