import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from '../styles/components/logout.css';

function Logout({ setLogoutIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogoutIsOpen(false);

    setTimeout(() => {
      navigate('/');

      dispatch({
        type: 'counter/isLoggedIn',
        payload: { data: false },
      });

      dispatch({
        type: 'counter/user',
        payload: { data: null },
      });
    }, 1000);
  }

  return (
    <div className={style.logout}>
      <div className={style['logout-wrap']}>
        <div className={style.header}>
          <h2 className={style.title}>Sign Out.</h2>
          <span className={style.strip}></span>
          <p className={style.text}>
            Are you sure you want to sign out of this account?
            Select 'yes' to continue and select 'cancel' to cancel
          </p>
        </div>
        <div className={style.action}>
          <button
            type="submit"
            className={style.btn}
            onClick={() => setLogoutIsOpen(false)}
          >
            <p className="text">Cancel</p>
            <box-icon name="x-circle" color="#ffffff"></box-icon>
          </button>
          <button
            type="submit"
            className={style.btn}
            onClick={handleLogout}
          >
            <p className="text">Yes, I'm sure</p>
            <box-icon name="check-circle" color="#ffffff"></box-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
