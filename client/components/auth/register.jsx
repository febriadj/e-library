import React, { useState, useEffect } from 'react';
import style from '../../styles/components/auth/register.css';

function Register({
  registerIsOpen,
  setRegisterIsOpen,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const [response, setResponse] = useState({
    success: false,
    message: '',
    active: false,
  });

  const [valid, setValid] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
  });

  const [fields, setFields] = useState({
    firstname: '',
    lastname: '',
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

      if (
        !valid.firstname
        || !valid.lastname
        || !valid.email
        || !valid.password
      ) {
        const newError = {
          message: 'Please fill out the form correctly',
        }
        throw newError;
      }

      const url = isDev ? 'http://localhost:8000/api/users/register' : '/api/users/register';
      const req = await (await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: {
            first: fields.firstname,
            last: fields.lastname,
          },
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
        setRegisterIsOpen(false);
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
      firstname: fields.firstname.length >= 3 && fields.firstname.length <= 30,
      lastname: fields.lastname.length >= 3 && fields.lastname.length <= 30,
      email: expEmail.test(fields.email),
      password: expPass.test(fields.password),
    }));
  }, [fields]);

  return (
    <div className={`${style.register} ${registerIsOpen && style.active}`}>
      <div className={style.header}>
        <h1 className={style.title}>Sign Up</h1>
        <p className={style.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi quae sapiente placeat.
        </p>
      </div>
      <form className={style['register-wrap']} onSubmit={handleSubmit}>
        <label htmlFor="firstname" className={style.fields}>
          <box-icon name="user" className={style.icon}></box-icon>
          <span className={style.center}>
            <p className={style.label}>First Name</p>
            <input
              type="firstname"
              id="firstname"
              className={`${style['form-control']} ${style.firstname}`}
              name="firstname"
              placeholder="input your first name"
              onChange={handleChange}
              value={fields.firstname}
              required
            />
          </span>
          <box-icon
            className={style.valid}
            name={valid.firstname ? 'check-circle' : 'x-circle'}
            color={valid.firstname ? '#188c94' : '#9B0000'}
          >
          </box-icon>
        </label>
        <label htmlFor="lastname" className={style.fields}>
          <box-icon name="user" className={style.icon}></box-icon>
          <span className={style.center}>
            <p className={style.label}>Last Name</p>
            <input
              type="lastname"
              id="lastname"
              className={`${style['form-control']} ${style.lastname}`}
              name="lastname"
              placeholder="input your last name"
              onChange={handleChange}
              value={fields.lastname}
              required
            />
          </span>
          <box-icon
            className={style.valid}
            name={valid.lastname ? 'check-circle' : 'x-circle'}
            color={valid.lastname ? '#188c94' : '#9B0000'}
          >
          </box-icon>
        </label>
        <label htmlFor="regisEmail" className={style.fields}>
          <box-icon name="envelope" className={style.icon}></box-icon>
          <span className={style.center}>
            <p className={style.label}>Email Address</p>
            <input
              type="email"
              id="regisEmail"
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
        <label htmlFor="regisPassword" className={style.fields}>
          <box-icon name="lock-open-alt" className={style.icon}></box-icon>
          <span className={style.center}>
            <p className={style.label}>Password</p>
            <input
              type="password"
              id="regisPassword"
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
          <p className={style.text}>Sign Up</p>
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
          onClick={() => setRegisterIsOpen(false)}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Register;
