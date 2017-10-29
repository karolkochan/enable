import React from 'react';
import MainBar from '../components/MainBar/MainBar';
import TracksList from '../components/TracksList/TracksList';
import styles from './App.scss';
import Track from '../components/Track/Track';
import {LinearProgress} from 'material-ui/Progress';
import api from '../services/api.service';
import TrackMap from '../components/TrackMap/TrackMap';
import {MuiThemeProvider} from 'material-ui/styles';
import {darkTheme} from '../components/Theme/Themes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: true,
      filter: {
        prosthesis: false,
        crutches: false,
        wheelchair_tetraplegia: false,
        wheelchair_paraplegia: false
      }
    };
  }

  componentDidMount = () => {
    this.search();
  }

  search = (query) => {
    query = query ? query : this.state.filter;
    this.setState({
      progress: true,
      track: null,
      filter: query
    });

    api
      .getTracks(query)
      .then((tracks) => {
        this.setState({
          tracks: tracks,
          track: null,
          progress: false
        });
      });
  }

  handleShowTrack = (id) => {
    this.setState({
      progress: true
    });

    api
      .getTrack(id)
      .then((track) => {
        this.setState({
          tracks: null,
          track: track,
          progress: false
        });
      });
  }

  registerMap = (map) => {
    this.setState({
      map: map
    });
  }

  handleShowList = () => {
    this.setState({
      id: null,
      track: null,
      tracks: null
    });
  }

  onRedirect = (id) => {
    this.handleShowTrack(id);
  }

  render() {
    const {tracks, track, progress, filter, map} = this.state;

    return (
      <MuiThemeProvider theme={darkTheme}>
        <div className={styles.root}>
          <MainBar className={styles.toolbar}
            onRedirect={this.onRedirect}
            filter={filter}
            track={track}
            onBack={this.search}
            onFilter={this.search}></MainBar>
          {progress ? <LinearProgress color="accent"/> : null}
          <div className={styles.scrollable}>
            <TrackMap className={styles.map} registerMap={this.registerMap}></TrackMap>
            {tracks && map ? <TracksList tracks={tracks} onTrackSelect={this.handleShowTrack}></TracksList> : null}
            {track && map ? <Track track={track} map={map}></Track> : null}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
