import React, { useState, useEffect } from 'react';
import style from '../styles/pages/dashboard.css';

import * as comp0 from '../components';

function Dashboard() {
  const [logoutIsOpen, setLogoutIsOpen] = useState(false);

  useEffect(() => {
    document.title = 'E-Library - Dashboard';
  });

  return (
    <div className={style.dashboard}>
      { logoutIsOpen && <comp0.logout setLogoutIsOpen={setLogoutIsOpen} /> }
      <comp0.sidebar linkActive="dashboard" />
      <div className={style['dashboard-wrap']}>
        <comp0.navbar
          setLogoutIsOpen={setLogoutIsOpen}
        />
        <div className={style.top}>
          <p>top</p>
        </div>
        <div className={style.bottom}>
          <div className={style.activities}>
            <div className={style.header}>
              <h3 className={style.title}>Activities Today</h3>
            </div>
            <div className={style.list}>
              <div className={style.cards}>
                <span className={style.tag}></span>
                <p className={style.text}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
              </div>
              <div className={style.cards}>
                <span className={style.tag}></span>
                <p className={style.text}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
              </div>
              <div className={style.cards}>
                <span className={style.tag}></span>
                <p className={style.text}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
