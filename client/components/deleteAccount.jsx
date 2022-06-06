import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from '../styles/components/deleteAccount.css';

function DeleteAccount({ setModal }) {
  const isDev = process.env.NODE_ENV === 'development';
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [response, setResponse] = useState({
    success: false,
    message: null,
  });

  const handleDeleteAccount = async (event) => {
    try {
      event.preventDefault();
      const url = isDev ? 'http://localhost:8000/api/users' : '/api/users';

      const req = await (await fetch(url, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })).json();

      setPassword('');
      if (!req.success) throw req;

      setResponse((prev) => ({
        ...prev,
        success: true,
        message: req.message,
      }));

      setTimeout(() => {
        localStorage.removeItem('token');

        setModal((prev) => ({
          ...prev,
          deleteAccount: false,
        }));

        setTimeout(() => {
          dispatch({
            type: 'counter/isLoggedIn',
            payload: { data: false },
          });

          dispatch({
            type: 'counter/user',
            payload: { data: null },
          });

          navigate('/');
        }, 500);
      }, 500);
    }
    catch (error0) {
      setResponse((prev) => ({
        ...prev,
        success: false,
        message: error0.message,
      }));
    }
  }

  return (
    <div className={style['delete-acc']}>
      <span
        className={style['close-area']}
        aria-hidden="true"
        onClick={() => setModal((prev) => ({
          ...prev,
          deleteAccount: false,
        }))}
      >
      </span>
      <div className={style['delete-acc-wrap']}>
        <div className={style.nav}>
          <h2 className={style.title}>Delete Account</h2>
          <button
            type="button"
            onClick={() => setModal((prev) => ({
              ...prev,
              deleteAccount: false,
            }))}
          >
            <box-icon name="x"></box-icon>
          </button>
        </div>
        <p className={style.text}>
          This account will be deleted, all data will be lost
          & you can no longer access this account
        </p>
        <form method="delete" className={style.form} onSubmit={handleDeleteAccount}>
          <span className={style.response}><p>{response.message}</p></span>
          <input
            type="password"
            name="password"
            className={style.input}
            id="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(event) => {
              setPassword(event.target.value);
              if (response.message) {
                setResponse((prev) => ({
                  ...prev, success: false, message: null,
                }));
              }
            }}
          />
          <button type="submit" className={style['submit-btn']}>
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccount;
