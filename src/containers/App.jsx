import React from 'react';
import MainBar from '../components/MainBar/MainBar';
import TracksList from '../components/TracksList/TracksList';
import styles from './App.scss';

function App() {
  return (
    <div className={styles.root}>
      <MainBar className={styles.toolbar}></MainBar>
      <div className={styles.scrollable}>
        <TracksList></TracksList>
      </div>
    </div>
  );
}

export default App;
