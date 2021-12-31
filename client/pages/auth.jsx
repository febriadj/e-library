import React, { useState, useEffect } from 'react';
import style from '../styles/pages/auth.css';

import * as comp from '../components/auth';

function Auth({
  setLoggedIn,
}) {
  const [registerIsOpen, setRegisterIsOpen] = useState(false);

  useEffect(() => {
    document.title = `E-library - ${registerIsOpen ? 'Sign Up' : 'Sign In'}`;
  });

  return (
    <div className={style.auth}>
      <div className={style['auth-wrap']}>
        <comp.login
          setLoggedIn={setLoggedIn}
          setRegisterIsOpen={setRegisterIsOpen}
          registerIsOpen={registerIsOpen}
        />
        <comp.register
          setRegisterIsOpen={setRegisterIsOpen}
          registerIsOpen={registerIsOpen}
        />
      </div>
    </div>
  );
}

export default Auth;
