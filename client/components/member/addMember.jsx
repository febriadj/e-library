import React, { useState, useEffect } from 'react';
import style from '../../styles/components/member/addMember.css';

function AddMember({
  setAddMemberIsOpen,
  handleGetMembers,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const pagLimit = JSON.parse(localStorage.getItem('pag'));

  const [response, setResponse] = useState({
    success: false,
    message: '',
    active: false,
  });

  const [valid, setValid] = useState({
    title: false,
    firstname: false,
    lastname: false,
    phone: false,
    address: false,
  });

  const [fields, setFields] = useState({
    documentId: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
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
        !valid.documentId
        || !valid.firstname
        || !valid.lastname
        || !valid.phone
        || !valid.address
      ) {
        const newError = {
          message: 'Please fill out the form correctly',
        }
        throw newError;
      }

      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/members' : '/api/members';

      const request = await (await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...fields,
          fullname: `${fields.firstname} ${fields.lastname}`,
        }),
      })).json();

      if (!request.success) throw request;

      setFields((prev) => ({
        ...prev, documentId: '', firstname: '', lastname: '', address: '', email: '', phone: '',
      }));

      setResponse((prev) => ({
        ...prev,
        success: true,
        message: request.message,
        active: true,
      }));

      handleGetMembers(pagLimit.member);

      setTimeout(() => {
        setAddMemberIsOpen(false);
        setResponse((prev) => ({
          ...prev, message: '', active: false,
        }));
      }, 1000);
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
    let mounted = true;

    if (mounted) {
      setValid((prev) => ({
        ...prev,
        documentId: /^[a-zA-Z0-9]{5,30}$/g.test(fields.documentId),
        firstname: /^[a-zA-Z.,\s]{3,30}$/g.test(fields.firstname),
        lastname: /^[a-zA-Z.,\s]{3,30}$/g.test(fields.lastname),
        phone: fields.phone.length >= 5 && fields.phone.length <= 30,
        address: fields.address.length >= 5,
      }));
    }

    return () => {
      mounted = false;
    }
  }, [fields]);

  return (
    <div className={style.addmember}>
      <span
        className={style['close-area']}
        onClick={() => setAddMemberIsOpen(false)}
        aria-hidden="true"
      >
      </span>
      <div className={style['addmember-wrap']}>
        <div className={style.nav}>
          <div className={style.top}>
            <button
              type="button"
              className={style.btn}
              onClick={() => setAddMemberIsOpen(false)}
            >
              <box-icon name="arrow-back"></box-icon>
            </button>
            <h2 className={style.title}>Add Member</h2>
          </div>
          <p className={style.text}>
            Fill out all the available forms to add a new member
          </p>
        </div>
        <form method="post" className={style.form} onSubmit={handleSubmit}>
          <label className={style.fields} htmlFor="documentId">
            <div className={style.center}>
              <p className={style.label}>Document ID</p>
              <input
                type="text"
                name="documentId"
                id="documentId"
                className={style.control}
                placeholder="character length must be more than 5 to 50"
                onChange={handleChange}
                value={fields.documentId}
                required
              />
            </div>
            <box-icon
              name={valid.documentId ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.documentId ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="firstname">
            <div className={style.center}>
              <p className={style.label}>First Name</p>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className={style.control}
                placeholder="other than letters are not allowed"
                onChange={handleChange}
                value={fields.firstname}
                required
              />
            </div>
            <box-icon
              name={valid.firstname ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.firstname ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="lastname">
            <div className={style.center}>
              <p className={style.label}>Last Name</p>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className={style.control}
                placeholder="other than letters are not allowed"
                onChange={handleChange}
                value={fields.lastname}
                required
              />
            </div>
            <box-icon
              name={valid.lastname ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.lastname ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="email">
            <div className={style.center}>
              <p className={style.label}>Email Address</p>
              <input
                type="text"
                name="email"
                id="email"
                className={style.control}
                placeholder="email address (optional)"
                onChange={handleChange}
                value={fields.email}
              />
            </div>
          </label>
          <label className={style.fields} htmlFor="phone">
            <div className={style.center}>
              <p className={style.label}>Phone Number</p>
              <input
                type="text"
                name="phone"
                id="phone"
                className={style.control}
                placeholder="active phone number"
                onChange={handleChange}
                value={fields.phone}
                required
              />
            </div>
            <box-icon
              name={valid.phone ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.phone ? '#188c94' : '#9B0000'}
            >
            </box-icon>
          </label>
          <label className={style.fields} htmlFor="address">
            <div className={style.center}>
              <p className={style.label}>Address</p>
              <input
                type="text"
                name="address"
                id="address"
                className={style.control}
                placeholder="character length must be more than 5"
                onChange={handleChange}
                value={fields.address}
                required
              />
            </div>
            <box-icon
              name={valid.address ? 'check-circle' : 'x-circle'}
              className={style.valid}
              color={valid.address ? '#188c94' : '#9B0000'}
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
          <button type="submit" className={style['submit-btn']}>
            <p className={style.text}>Submit</p>
            <box-icon name="plus-circle" color="#ffffff"></box-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
