// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Card, {CardHeader} from 'material-ui/Card';
import ButtonBase from 'material-ui/ButtonBase';
import Avatar from 'material-ui/Avatar';

import styles from './TracksList.scss';

const tracks = [
  {
    id: 1,
    distance: 5.2,
    date: '15.09.2017',
    name: 'Blonia'
  },
  {
    id: 2,
    distance: 7.2,
    date: '22.06.2017',
    name: 'Bulwary wislane'
  },
  {
    id: 3,
    distance: 3.8,
    date: '02.05.2017',
    name: 'Blonia one more time'
  },
  {
    id: 4,
    distance: 22.4,
    date: '29.01.2017',
    name: 'Jordan Park'
  }
];

export default class TracksList extends React.Component {
  render() {
    const {onTrackSelect} = this.props;

    return (
      <div className={styles.content}>
        <ul className={styles.list}>
          {tracks.map((track) =>
            <li key={track.id}>
              <ButtonBase className={styles.buttonFull} onClick={() => onTrackSelect(track.id)}>
                <Card className={styles.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Recipe" className={styles.avatar}>
                        {track.distance}km
                      </Avatar>
                    }
                    title={track.name}
                    subheader={track.date}
                  />
                </Card>
              </ButtonBase>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

TracksList.propTypes = {
  onTrackSelect: PropTypes.func.isRequired
};
