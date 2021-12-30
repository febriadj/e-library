import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'boxicons';

import './styles/app.css';
import * as page from './pages';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, [loggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        {
          loggedIn ? (
            < >
              <Route exact path="/" element={<page.dashboard />} />
              <Route exact path="/book" element={<page.bookCatalogs />} />
            </>
          ) : <Route exact path="/" element={<page.auth setLoggedIn={setLoggedIn} />} />
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
