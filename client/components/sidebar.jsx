import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/components/sidebar.css';

function Sidebar({
  linkActive,
}) {
  return (
    <div className={style.sidebar}>
      <div className={style['sidebar-wrap']}>
        <div className={style.header}>
          <span className={style.logo}>
            <box-icon name="cube" color="#ffffffdd"></box-icon>
            <h2>E-library</h2>
          </span>
          <p className={style.text}>
            Simple and user-friendly web-based digital library application
          </p>
        </div>
        <div className={style.menu}>
          <Link to="/" className={`${style.link} ${linkActive === 'dashboard' && style.active}`}>
            <box-icon name="home-alt" color="#ffffffdd"></box-icon>
            <p className={style.text}>Dashboard</p>
          </Link>
          <Link to="/member" className={`${style.link} ${linkActive === 'member' && style.active}`}>
            <box-icon name="group" color="#ffffffdd"></box-icon>
            <p className={style.text}>Member</p>
          </Link>
          <Link to="/book" className={`${style.link} ${linkActive === 'book' && style.active}`}>
            <box-icon name="book" color="#ffffffdd"></box-icon>
            <p className={style.text}>Book Catalog</p>
          </Link>
          <Link to="/loan" className={`${style.link} ${linkActive === 'loan' && style.active}`}>
            <box-icon name="shopping-bag" color="#ffffffdd"></box-icon>
            <p className={style.text}>Loan</p>
          </Link>
        </div>
        <div className={style.footer}>
          <span className={style.cp}><box-icon name="copyright" color="#ffffff"></box-icon></span>
          <p className={style.text}>&copy; 2022. All right reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
