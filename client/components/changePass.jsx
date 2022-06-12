import React, { useState, useEffect } from 'react';
import style from '../styles/components/changePass.css';

function ChangePass({ setModal }) {
  const isDev = process.env.NODE_ENV === 'development';
  const token = localStorage.getItem('token');

  const [valid, setValid] = useState({
    old: false,
    new: false,
    newConfirm: false,
  });

  const [form, setForm] = useState({
    old: '',
    new: '',
    newConfirm: '',
  });

  const [response, setResponse] = useState('');

  const handleChange = (event) => {
    if (response) {
      setResponse('');
    }
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (!valid.old || !valid.new || !valid.newConfirm) {
        const newError = {
          message: 'Please fill out the form correctly',
        }
        throw newError;
      }

      const url = isDev ? 'http://localhost:8000/api/users/change-pass' : '/api/users/change-pass';
      const req = await (await fetch(url, {
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPass: form.old,
          newPass: form.new,
        }),
      })).json();

      if (!req.success) throw req;
      setResponse(req.message);

      setTimeout(() => {
        setModal((prev) => ({
          ...prev,
          changePass: false,
        }));
      }, 1000);
    }
    catch (error0) {
      setResponse(error0.message);
    }
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setValid((prev) => ({
        ...prev,
        old: /^(?=.*\d)(?=.*[a-z]).{8,16}$/g.test(form.old),
        new: /^(?=.*\d)(?=.*[a-z]).{8,16}$/g.test(form.new),
        newConfirm: /^(?=.*\d)(?=.*[a-z]).{8,16}$/g.test(form.newConfirm) && form.newConfirm === form.new,
      }));
    }

    return () => {
      mounted = false;
    }
  }, [form]);

  return (
    <div className={style.changepass}>
      <span
        className={style['close-area']}
        aria-hidden="true"
        onClick={() => setModal((prev) => ({
          ...prev,
          changePass: false,
        }))}
      >
      </span>
      <div className={style['changepass-wrap']}>
        <span className={style.nav}>
          <h2 className={style.title}>Change Password</h2>
          <button
            type="button"
            onClick={() => setModal((prev) => ({
              ...prev,
              changePass: false,
            }))}
          >
            <box-icon name="x"></box-icon>
          </button>
        </span>
        <form
          method="post"
          className={style.form}
          onSubmit={handleSubmit}
        >
          <label htmlFor="old-pass" className={style.fields}>
            <box-icon name="lock-alt"></box-icon>
            <input
              type="password"
              name="old"
              id="old-pass"
              placeholder="Enter your old password"
              value={form.old}
              onChange={handleChange}
              required
            />
            <box-icon
              className={style.valid}
              name={valid.old ? 'check-circle' : 'x-circle'}
              color={valid.old ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label htmlFor="new-pass" className={style.fields}>
            <box-icon name="key"></box-icon>
            <input
              type="password"
              name="new"
              id="new-pass"
              placeholder="Enter new password"
              value={form.new}
              onChange={handleChange}
              required
            />
            <box-icon
              className={style.valid}
              name={valid.new ? 'check-circle' : 'x-circle'}
              color={valid.new ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label htmlFor="newConfirm-pass" className={style.fields}>
            <box-icon name="key"></box-icon>
            <input
              type="password"
              name="newConfirm"
              id="newConfirm-pass"
              placeholder="Re-enter new password"
              value={form.newConfirm}
              onChange={handleChange}
              required
            />
            <box-icon
              className={style.valid}
              name={valid.newConfirm ? 'check-circle' : 'x-circle'}
              color={valid.newConfirm ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <span className={style.response}><p>{response}</p></span>
          <button
            type="submit"
            className={style['submit-btn']}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePass;
