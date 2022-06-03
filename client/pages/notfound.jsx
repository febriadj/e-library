import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as comp from '../components';
import style from '../styles/pages/notfound.css';

function NotFound() {
  const { isLoggedIn, user } = useSelector((state) => state);

  const [modal, setModal] = useState({
    deleteAccount: false,
    changePassword: false,
    logout: false,
    profile: false,
  });

  useEffect(() => {
    document.title = 'E-library - 404';
  }, []);

  return (
    <div className={style.notfound}>
      {isLoggedIn && user && (<comp.sidebar linkActive={null} />)}
      { modal.logout && <comp.logout setModal={setModal} /> }
      { modal.deleteAccount && (<comp.deleteAccount setModal={setModal} />) }
      { modal.changePass && (<comp.changePass setModal={setModal} />) }
      {
        modal.profile && (
          <comp.profile
            setModal={setModal}
          />
        )
      }
      <div className={style['notfound-wrap']}>
        <comp.navbar
          path="404"
          setModal={setModal}
        />
        <div className={style.main}>
          <div className={style['main-wrap']}>
            <h1>Opss. 404</h1>
            <p>
              The page you are looking for cannot be found,
              please always use the menu link in the sidebar to go to another page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
