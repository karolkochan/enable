/* global google */

import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import StarIcon from 'material-ui-icons/Star';
import {LinearProgress} from 'material-ui/Progress';
import api from '../../services/api.service';

import styles from './Track.scss';

const DISABILITIES = [
  {
    type: 'prosthesis',
    label: 'Prosthesis'
  },
  {
    type: 'crutches',
    label: 'Crutches'
  },
  {
    type: 'wheelchair_tetraplegia',
    label: 'Wheelchair tetraplegia'
  },
  {
    type: 'wheelchair_paraplegia',
    label: 'Wheelchair paraplegia'
  }
];

const RATINGS = [1, 2, 3, 4, 5];

export default class Track extends React.Component {
  flightPath;

  constructor(props) {
    super(props);
    const defaults = DISABILITIES.reduce((map, {type}) => {
      map[type] = false;
      return map;
    }, {difficult_level: 5});
    this.state = Object.assign({}, defaults, props.track);
  }

  componentDidMount() {
    const {map, track} = this.props;
    const {lat, lon} = track.points[0];

    const flightPlanCoordinates = track.points.map((point) => ({
      lat: parseFloat(point.lat),
      lng: parseFloat(point.lon)
    }));
    console.log(flightPlanCoordinates);

    this.flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#ff4081',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    this.flightPath.setMap(map);

    map.setCenter({
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    });
    map.setZoom(12);
  }

  componentWillUnmount() {
    this.flightPath.setMap(null);
  }

  handleToggle = (prop) => {
    this.setState({
      progress: true,
      [prop]: !this.state[prop]
    });

    const {id, prosthesis, crutches, wheelchair_tetraplegia, wheelchair_paraplegia, difficult_level} = this.state;
    api
      .updateTrack(id, Object.assign(
        {},
        {prosthesis, crutches, wheelchair_tetraplegia, wheelchair_paraplegia, difficult_level: difficult_level},
        {[prop]: !this.state[prop]}
      ))
      .then(() => this.setState({progress: false}))
      .catch(() => this.setState({progress: false}));
  }

  handleDifficultLevel = (difficult_level) => {
    this.setState({
      progress: true,
      difficult_level: difficult_level
    });

    const {id, prosthesis, crutches, wheelchair_tetraplegia, wheelchair_paraplegia} = this.state;
    api
      .updateTrack(
        id,
        {prosthesis, crutches, wheelchair_tetraplegia, wheelchair_paraplegia, difficult_level: difficult_level}
      )
      .then(() => this.setState({progress: false}))
      .catch(() => this.setState({progress: false}));
  }

  render() {
    const {difficult_level, progress} = this.state;

    return (
      <div className={styles.content}>
        {progress ? <LinearProgress color="accent"/> : null}
        <Paper className={styles.configurator} elevation={4}>
          <List className={styles.list}>
            <ListSubheader>Friendly for</ListSubheader>
            {DISABILITIES.map(({type, label}) =>
              <ListItem dense button onClick={() => this.handleToggle(type)} className={styles.listElement} key={type}>
                <Checkbox checked={this.state[type]} tabIndex={-1} disableRipple color="accent"/>
                <ListItemText primary={label} className={styles.label}/>
              </ListItem>
            )}
            <Divider/>
            <ListSubheader>Difficulty level</ListSubheader>
            <ListItem dense className={styles.listElement}>
              <div>
                {RATINGS.map((level) =>
                  <IconButton key={level}
                    className={styles.star}
                    color={level <= difficult_level ? 'accent' : 'default'}
                    aria-label={`Rate ${level}`}
                    onClick={() => this.handleDifficultLevel(level)}>
                    <StarIcon />
                  </IconButton>
                )}
              </div>
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  map: PropTypes.any.isRequired
};
