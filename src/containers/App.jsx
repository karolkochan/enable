import React from 'react';
import MainBar from '../components/MainBar/MainBar';
import TracksList from '../components/TracksList/TracksList';
import styles from './App.scss';
import Track from '../components/Track/Track';

const VIEW = {
  LIST: 'LIST',
  TRACK: 'TRACK'
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: VIEW.LIST
    };
  }

  handleShowTrack = ({id}) => {
    this.setState({
      view: VIEW.TRACK,
      id: id
    });
  }

  handleShowList = () => {
    this.setState({
      view: VIEW.LIST,
      id: null
    });

  }

  render() {
    const {view} = this.state;

    return (
      <div className={styles.root}>
        <MainBar className={styles.toolbar}></MainBar>
        <div className={styles.scrollable}>
          {view === VIEW.LIST ? <TracksList onTrackSelect={this.handleShowTrack}></TracksList> : null}
          {view === VIEW.TRACK ? <Track onBack={this.handleShowList}></Track> : null}
        </div>
      </div>
    );
  }
}
