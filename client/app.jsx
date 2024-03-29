import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'boxicons';
import { useDispatch, useSelector } from 'react-redux';

import './styles/app.css';
import * as page from './pages';

function App() {
  const isDev = process.env.NODE_ENV === 'development';
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state);

  const handleGetUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? 'http://localhost:8000/api/users' : '/api/users';

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();

      if (!request.success) throw request;

      dispatch({
        type: 'counter/user',
        payload: {
          data: request.data,
        },
      });
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handlePagLimit = () => {
    const local = localStorage.getItem('pag');
    if (!local) {
      localStorage.setItem('pag', JSON.stringify({
        member: 10,
        book: 10,
        loan: 10,
      }));
    }
  }

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem('token');

    if (mounted) {
      dispatch({
        type: 'counter/isLoggedIn',
        payload: {
          data: !!token,
        },
      });

      handlePagLimit();
      if (isLoggedIn) handleGetUser();
    }

    return () => {
      mounted = false;
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        {
          isLoggedIn && user ? (
            < >
              <Route exact path="/" element={<page.dashboard />} />
              <Route exact path="/book" element={<page.bookCatalog />} />
              <Route exact path="/loan" element={<page.loan />} />
              <Route exact path="/member" element={<page.member />} />
              <Route path="*" element={<page.notfound />} />
            </>
          ) : <Route exact path="*" element={<page.auth />} />
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
