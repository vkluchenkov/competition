/** @jsxImportSource @emotion/react */
import React from 'react';
import './App.css';
import { Main } from './pages/Main';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { QueuePopup } from './components/QueuePopup';
import { QueueProvider } from './store/Queue';
import { UserProvider } from './store/User';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

  function App() {
    return (
      <QueueProvider>
        <UserProvider>
          <Router>
            <Header />
            <main css={{ display: "flex", backgroundColor: "#f8f8f8" }}>
              <Menu />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <QueuePopup />
          </Router>
        </UserProvider>
      </QueueProvider>
  );
}

export default App;
