import React from 'react';
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
    type: 'wheelchairTetraplegia',
    label: 'Wheelchair tetraplegia'
  },
  {
    type: 'wheelchairParaplegia',
    label: 'Wheelchair paraplegia'
  }
];

const RATINGS = [1, 2, 3, 4, 5];

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      distance: 5.2,
      rating: 3,
      date: '15.09.2017',
      name: 'Blonia',
      prosthesis: false,
      crutches: true,
      wheelchairTetraplegia: false,
      wheelchairParaplegia: false,
      progress: false
    };
  }

  handleToggle = (prop) => {
    this.setState({
      progress: true,
      [prop]: !this.state[prop]
    });

    const {id, prosthesis, crutches, wheelchairTetraplegia, wheelchairParaplegia, rating} = this.state;
    api
      .updateTrack(id, Object.assign({}, {prosthesis, crutches, wheelchairTetraplegia, wheelchairParaplegia, rating}, {
        [prop]: !this.state[prop]
      }))
      .then(() => this.setState({progress: false}))
      .catch(() => this.setState({progress: false}));
  }

  handleRate = (rate) => {
    this.setState({
      progress: true,
      rating: rate
    });

    const {id, prosthesis, crutches, wheelchairTetraplegia, wheelchairParaplegia, rating} = this.state;
    api
      .updateTrack(id, Object.assign({}, {prosthesis, crutches, wheelchairTetraplegia, wheelchairParaplegia, rating}, {
        rating: rate
      }))
      .then(() => this.setState({progress: false}))
      .catch(() => this.setState({progress: false}));
  }

  render() {
    const {rating, progress} = this.state;

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
            <ListSubheader>Rating</ListSubheader>
            <ListItem dense className={styles.listElement}>
              <div>
                {RATINGS.map((rate) =>
                  <IconButton key={rate}
                    className={styles.star}
                    color={rate <= rating ? 'accent' : 'default'}
                    aria-label={`Rate ${rate}`}
                    onClick={() => this.handleRate(rate)}>
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
