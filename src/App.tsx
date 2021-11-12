/** @jsxImportSource @emotion/react */
import React, { Fragment } from 'react';
import { css } from '@emotion/react';
import './App.css';
import { VideoGrid } from './components/VideoGrid';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { QueuePopup } from './components/QueuePopup';
import { QueueProvider } from './store/Queue';
import { UserProvider } from './store/User';
import { Login } from './pages/login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

  function App() {
    return (
      <QueueProvider>
        <UserProvider>
          <Router>
            <Header />
            <main css={{ display: "flex", backgroundColor: "#f8f8f8" }}>
              <Menu />
              <Routes>
                <Route path="/">
                  <VideoGrid />
                  <Login />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </Routes>
            </main>
            <QueuePopup />
          </Router>
        </UserProvider>
      </QueueProvider>
  );
}

export default App;
