// @flow weak

import React from 'react';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';

import styles from './TracksList.scss';

const tracks = [
  {
    id: 1,
    name: 'Track 1'
  },
  {
    id: 2,
    name: 'Track 2'
  },
  {
    id: 3,
    name: 'Track 3'
  },
  {
    id: 4,
    name: 'Track 4'
  }
];

function TracksList() {
  return (
    <div className={styles.list}>
      {tracks.map((track) =>
        <div key={track.id}>
          <Card className={styles.card}>
            <div className={styles.details}>
              <CardContent className={styles.content}>
                <Typography type="headline">Live From Space</Typography>
                <Typography type="subheading" color="secondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={styles.controls}>
              </div>
            </div>
            <CardMedia
              className={styles.cover}
              image="/static/images/cards/live-from-space.jpg"
              title="Live from space album cover"
            />
          </Card>
        </div>
      )}
    </div>
  );
}

export default TracksList;
