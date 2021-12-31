import React, { useEffect } from 'react';
import style from '../styles/pages/dashboard.css';

import * as comp from '../components';

function Dashboard() {
  useEffect(() => {
    document.title = 'E-library - Dashboard';
  });

  return (
    <div className={style.dashboard}>
      <comp.sidebar linkActive="dashboard" />
      <div className={style['dashboard-wrap']}>
        <comp.navbar />
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
