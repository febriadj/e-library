import React, { useState, useEffect } from 'react';
import style from '../../styles/components/auth/login.css';

function Login({
  setLoggedIn,
  setRegisterIsOpen,
  registerIsOpen,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const [response, setResponse] = useState({
    success: false,
    message: '',
    active: false,
  });

  const [valid, setValid] = useState({
    email: false,
    password: false,
  });

  const [fields, setFields] = useState({
    remember: 'off',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (!valid.email || !valid.password) {
        const newError = {
          message: 'Please fill out the form correctly',
        }
        throw newError;
      }

      const url = isDev ? 'http://localhost:8000/api/users/login' : '/api/users/login';
      const req = await (await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: fields.email,
          password: fields.password,
        }),
      })).json();

      if (!req.success) throw req;

      setResponse((prev) => ({
        ...prev,
        success: true,
        message: req.message,
        active: true,
      }));

      setTimeout(() => {
        localStorage.setItem('token', req.data);
        setLoggedIn(true);
      }, 2000);
    }
    catch (error0) {
      setResponse((prev) => ({
        ...prev,
        success: false,
        message: error0.message,
        active: true,
      }));
    }
  }

  useEffect(() => {
    const expEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const expPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\W).{8,16}$/g;

    setValid((prev) => ({
      ...prev,
      email: expEmail.test(fields.email),
      password: expPass.test(fields.password),
    }));
  }, [fields]);

  return (
    <div className={`${style.login} ${!registerIsOpen && style.active}`}>
      <div className={style.header}>
        <h1 className={style.title}>Sign In</h1>
        <p className={style.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi quae sapiente placeat.
        </p>
      </div>
      <form className={style['login-wrap']} onSubmit={handleSubmit}>
        <label htmlFor="email" className={style.fields}>
          <box-icon name="user" className={style.icon}></box-icon>
          <span className={style.center}>
            <p className={style.label}>Email Address</p>
            <input
              type="email"
              id="email"
              className={`${style['form-control']} ${style.email}`}
              name="email"
              placeholder="input your email address"
              onChange={handleChange}
              value={fields.email}
              required
            />
          </span>
          <box-icon
            className={style.valid}
            name={valid.email ? 'check-circle' : 'x-circle'}
            color={valid.email ? '#188c94' : '#9B0000'}
          >
          </box-icon>
        </label>
        <label htmlFor="password" className={style.fields}>
          <box-icon name="lock-open-alt" className={style.icon}></box-icon>
          <span className={style.center}>
            <p className={style.label}>Password</p>
            <input
              type="password"
              id="password"
              className={`${style['form-control']} ${style.password}`}
              name="password"
              placeholder="must contain A-Z, a-z, numbers & symbols"
              onChange={handleChange}
              value={fields.password}
              required
            />
          </span>
          <box-icon
            className={style.valid}
            name={valid.password ? 'check-circle' : 'x-circle'}
            color={valid.password ? '#188c94' : '#9B0000'}
          >
          </box-icon>
        </label>
        <div className={style.action}>
          <div className={style.remember}>
            <input
              type="checkbox"
              name="remember"
              className={style.check}
              onChange={handleChange}
              value={fields.remember === 'on' ? 'off' : 'on'}
            />
            <p className={style.text}>Remember me</p>
          </div>
          <button type="button" className={style.forgot}>Forgot password</button>
        </div>
        <span className={style.response}>
          { response.active && (
            <box-icon
              name={response.success ? 'check-circle' : 'x-circle'}
              color={response.success ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          ) }
          <p className={style.text}>{response.message}</p>
        </span>
        <button type="submit" className={`${style.btn} ${style['submit-btn']}`}>
          <p className={style.text}>Sign In</p>
          <box-icon
            type="regular"
            name="right-top-arrow-circle"
            color="#ffffff"
          >
          </box-icon>
        </button>
      </form>
      <div className={style.footer}>
        <p className={style.text}>Don't have an account yet?</p>
        <button
          type="button"
          className={style.btn}
          onClick={() => setRegisterIsOpen(true)}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
