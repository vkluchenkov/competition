/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import './App.css';
import { VideoGrid } from './components/VideoGrid';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { QueuePopup } from './components/QueuePopup';
import { QueueProvider } from './store/Queue';
import { UserProvider } from './store/User';

  function App() {
    return (
    <QueueProvider>
      <UserProvider>
        <Header />
        <main css={{display: "flex", backgroundColor: "#f8f8f8"}}>
          <Menu />
          <VideoGrid />
        </main>
        <QueuePopup />
      </UserProvider>
    </QueueProvider>
  );
}

export default App;
