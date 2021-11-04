import React from 'react';
import './App.css';
import { QueueVideo } from './components/QueueVideo';
import { GridVideo } from './components/GridVideo';
import { videos } from './videos';

function App() {
  return (
    // <QueueVideo video={videos[0]} onClick={() => {console.log('1')}} />
    <GridVideo video={videos[0]} onClick={() => {console.log('2')}} inQueue={true} />
  );
}

export default App;
