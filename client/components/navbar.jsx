import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import style from '../styles/components/navbar.css';
import avatar from '../assets/images/avatar.png';

function Navbar({ path, setLogoutIsOpen }) {
  const { user } = useSelector((state) => state);

  const configDate = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  }

  const [time, setTime] = useState(new Date().toLocaleDateString([], configDate));

  const formatDate = () => {
    const initDate = new Date().toLocaleDateString([], configDate);
    setTime(initDate);
  }

  useEffect(() => {
    setInterval(() => formatDate(), 100);
  });

  return (
    <div className={style.navbar}>
      <div className={style.info}>
        <p className={style.date}>{time}</p>
        <div className={style.path}>
          <span className={style.tag}></span>
          <h3 className={style.text}>Dashboard {path && `/ ${path}`}</h3>
        </div>
      </div>
      <div className={style.profile}>
        <div className={style.text}>
          <h3 className={style.fullname}>{`${user.firstname} ${user.lastname}`}</h3>
          <p className={style.email}>{user.email}</p>
        </div>
        <img src={avatar} alt={avatar} className={style.avatar} />
        <button
          type="button"
          className={style['logout-btn']}
          onClick={() => setLogoutIsOpen(true)}
        >
          <box-icon name="log-in-circle"></box-icon>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
