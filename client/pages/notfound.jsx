import React from 'react';
import { useSelector } from 'react-redux';
import * as comp from '../components';
import style from '../styles/pages/notfound.css';

function NotFound() {
  const { isLoggedIn, user } = useSelector((state) => state);

  return (
    <div className={style.notfound}>
      {isLoggedIn && user && (<comp.sidebar linkActive={null} />)}
      <div className={style['notfound-wrap']}>
        {isLoggedIn && user && (<comp.navbar />)}
        <div className={style.main}>
          <h1>Opss. 404</h1>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
