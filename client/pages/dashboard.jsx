import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import style from '../styles/pages/dashboard.css';

import * as comp0 from '../components';

function Dashboard() {
  const token = localStorage.getItem('token');

  const [logoutIsOpen, setLogoutIsOpen] = useState(false);
  const [members, setMembers] = useState({ length: 0, today: 0 });
  const [books, setBooks] = useState({ length: 0, today: 0 });
  const [loans, setLoans] = useState({ length: 0, today: 0 });
  const [activities, setActivities] = useState([]);

  const handleGetActivities = async () => {
    try {
      const url = 'http://localhost:8000/api/activities';
      const request = await (await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      setActivities(request.data);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handleGetMonitorData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const [m, b, l] = await Promise.all([
        (await fetch('http://localhost:8000/api/members', options)).json(),
        (await fetch('http://localhost:8000/api/books', options)).json(),
        (await fetch('http://localhost:8000/api/loans', options)).json(),
      ]);

      const todayData = (args) => (
        args.filter((obj) => (
          moment(new Date(obj.updatedAt)).format('DD/MM/YY') === moment(new Date()).format('DD/MM/YY')
        )).length
      );

      setMembers((prev) => ({
        ...prev, length: m.data.length, today: todayData(m.data),
      }));
      setBooks((prev) => ({
        ...prev, length: b.data.length, today: todayData(b.data),
      }));
      setLoans((prev) => ({
        ...prev, length: l.data.length, today: todayData(l.data),
      }));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    document.title = 'E-Library - Dashboard';
    handleGetActivities();
    handleGetMonitorData();
  }, []);

  return (
    <div className={style.dashboard}>
      { logoutIsOpen && <comp0.logout setLogoutIsOpen={setLogoutIsOpen} /> }
      <comp0.sidebar linkActive="dashboard" />
      <div className={style['dashboard-wrap']}>
        <comp0.navbar
          setLogoutIsOpen={setLogoutIsOpen}
        />
        <div className={style.top}>
          <div className={style.monitor}>
            <div className={style.box}>
              <span className={style.info}>
                <p>Members</p>
                <h1 className={style.num}>
                  {members.length > 0 && members.length < 10 && 0}{members.length}
                </h1>
                <Link to="/member" className={style.link}>Check & Manage Page</Link>
              </span>
              <span className={style.icon}>
                <box-icon name="group"></box-icon>
              </span>
            </div>
            <div className={style.box}>
              <span className={style.info}>
                <p>Book Catalogs</p>
                <h1 className={style.num}>
                  {books.length > 0 && books.length < 10 && 0}{books.length}
                </h1>
                <Link to="/member" className={style.link}>Check & Manage Page</Link>
              </span>
              <span className={style.icon}>
                <box-icon name="book"></box-icon>
              </span>
            </div>
            <div className={style.box}>
              <span className={style.info}>
                <p>Book Loans</p>
                <h1 className={style.num}>
                  {loans.length > 0 && loans.length < 10 && 0}{loans.length}
                </h1>
                <Link to="/member" className={style.link}>Check & Manage Page</Link>
              </span>
              <span className={style.icon}>
                <box-icon name="shopping-bag"></box-icon>
              </span>
            </div>
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.header}>
            <h3 className={style.title}>Recent Activities</h3>
            <box-icon name="history"></box-icon>
          </div>
          <div className={style.activities}>
            <div className={style['activities-wrap']}>
              <table className={style.table}>
                <tbody className={style.tbody}>
                  {
                    activities.map((data) => (
                      <tr className={`${style.tr} ${style[data.action]}`} key={data.id}>
                        <td className={style.action}><span className={`${style.dot} ${style[data.action]}`}></span></td>
                        <td>{data.id}</td>
                        <td>{data.description}</td>
                        <td className={style.time}>
                          <span>{moment(data.createdAt).fromNow()}</span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
