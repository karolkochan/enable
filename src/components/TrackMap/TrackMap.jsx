/* global google */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './TrackMap.scss';

export default class TrackMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: 0, lng: -180},
      mapTypeId: 'terrain'
    });

    this.props.registerMap(this.map);
  }

  render() {
    return (
      <div id="map" className={styles.map}></div>
    );
  }
}

TrackMap.propTypes = {
  registerMap: PropTypes.func.isRequired
};
