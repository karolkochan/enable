// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Card, {CardHeader} from 'material-ui/Card';
import ButtonBase from 'material-ui/ButtonBase';
import Avatar from 'material-ui/Avatar';

import styles from './TracksList.scss';

export default class TracksList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onTrackSelect, tracks} = this.props;

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
  tracks: PropTypes.array.isRequired,
  onTrackSelect: PropTypes.func.isRequired
};
