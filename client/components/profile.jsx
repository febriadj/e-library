import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import style from '../styles/components/profile.css';

function Profile({
  setModal,
}) {
  const { user } = useSelector((state) => state);

  const handleModal = (close, open) => {
    setModal((prev) => ({
      ...prev,
      [close]: false,
    }));

    setTimeout(() => {
      setModal((prev) => ({
        ...prev,
        [open]: true,
      }));
    }, 200);
  }

  return (
    <div className={style.profile}>
      <span
        className={style['close-area']}
        onClick={() => setModal((prev) => ({
          ...prev,
          profile: false,
        }))}
        aria-hidden="true"
      >
      </span>
      <div className={style['profile-wrap']}>
        <h3 className={style.fullname}>{user.firstname} {user.lastname}</h3>
        <span className={style.email}>
          <box-icon name="envelope" color="#00000090"></box-icon>
          <p>{user.email}</p>
        </span>
        <span className={style.strip}></span>
        <button
          type="button"
          onClick={() => {
            handleModal('profile', 'deleteAccount');
          }}
        >
          <p>Delete Account</p>
        </button>
        <button type="button"><p>Change Password</p></button>
        <span className={style.strip}></span>
        <button
          type="button"
          className={style['logout-btn']}
          onClick={() => {
            handleModal('profile', 'logout');
          }}
        >
          Sign Out
        </button>
        <p className={style.info}>
          Have joined since {moment(user.createdAt).format('LL')}
        </p>
      </div>
    </div>
  );
}

export default Profile;
