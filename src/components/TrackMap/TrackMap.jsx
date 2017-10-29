/* global google */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './TrackMap.scss';
import mapStyle from './mapStyle';

export default class TrackMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: 0, lng: -180},
      mapTypeId: 'terrain',
      styles: mapStyle
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
