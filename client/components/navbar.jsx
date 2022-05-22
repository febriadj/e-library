import React from 'react';
import moment from 'moment';

import style from '../styles/components/navbar.css';
import avatar from '../assets/images/avatar.png';

function Navbar({ path, setModal }) {
  return (
    <div className={style.navbar}>
      <div className={style.info}>
        <p className={style.date}>{moment(new Date()).format('dddd, MMMM Do YYYY')}</p>
        <div className={style.path}>
          <span className={style.tag}></span>
          <h3 className={style.text}>Dashboard {path && `/ ${path}`}</h3>
        </div>
      </div>
      <div className={style.profile}>
        <img
          src={avatar}
          alt={avatar}
          className={style.avatar}
          onClick={() => {
            setModal((prev) => ({
              ...prev,
              profile: !prev.profile,
            }));
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default Navbar;
