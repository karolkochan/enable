// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ArrowBack from 'material-ui-icons/ArrowBack';
import CloudUploadIcon from 'material-ui-icons/CloudUpload';
import CloudDownloadIcon from 'material-ui-icons/CloudDownload';
import FilterListIcon from 'material-ui-icons/FilterList';
import Menu, {MenuItem} from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';

import styles from './MainBar.scss';
import UploadDialog from '../UploadDialog/UploadDialog';
import api from '../../services/api.service';

const FILTER_NAME = {
  prosthesis: 'Prosthesis',
  crutches: 'Crutches',
  wheelchair_tetraplegia: 'Wheelchair tetraplegia',
  wheelchair_paraplegia: 'Wheelchair paraplegia'
};

export default class MainBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadOpen: false,
      filterOpen: false
    };
  }

  handleClickOpenUpload = () => {
    this.setState({
      uploadOpen: true
    });
  };

  handleClickDownload = () => {
    api.download(this.props.track.id);
  };

  handleDialogClose = () => {
    this.setState({
      uploadOpen: false
    });
  }

  handleClickOpenMenu = (event) => {
    this.setState({
      menuAnchor: event.currentTarget,
      filterOpen: true
    });
  }

  handleClickCloseMenu = () => {
    this.setState({
      menuAnchor: null,
      filterOpen: false
    });
  }

  handleFilterChange = (key, value) => {
    this.props.onFilter(Object.assign({}, this.props.filter, {
      [key]: value
    }));
  }

  render() {
    const {uploadOpen, filterOpen, menuAnchor} = this.state;
    const {track, onBack, filter} = this.props;
    let bar;

    if (track) {
      bar = (
        <Toolbar>
          <IconButton className={styles.menuButton} color="contrast" aria-label="Menu" onClick={() => onBack()}>
            <ArrowBack/>
          </IconButton>
          <Typography type="title" color="inherit" className={styles.flex}>
            Selected track - {track.name}
          </Typography>
          <IconButton color="contrast" aria-label="Download" onClick={this.handleClickDownload}>
            <CloudDownloadIcon/>
          </IconButton>
        </Toolbar>
      );
    } else {
      bar = (
        <Toolbar>
          <IconButton className={styles.menuButton} color="contrast" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          <Typography type="title" color="inherit" className={styles.flex}>
            Enable
          </Typography>
          <IconButton color="contrast" aria-label="Upload" onClick={this.handleClickOpenUpload}>
            <CloudUploadIcon/>
          </IconButton>
          <IconButton color="contrast" aria-label="Filter" onClick={
            filterOpen ? this.handleClickCloseMenu : this.handleClickOpenMenu
          }>
            <FilterListIcon/>
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={menuAnchor}
            open={filterOpen}
            onRequestClose={this.handleClickCloseMenu}
          >
            {Object.keys(filter).map((key) => (
              <MenuItem key={key} onClick={() => this.handleFilterChange(key, !filter[key])}>
                <Checkbox checked={filter[key]}
                  tabIndex={-1}
                  disableRipple
                  color="accent"
                  className={styles.checkbox}/>
                {FILTER_NAME[key]}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      );
    }

    return (
      <div className={`${styles.root} ${this.props.className}`}>
        <AppBar position="static">
          {bar}
        </AppBar>

        <UploadDialog open={uploadOpen} onClose={this.handleDialogClose}/>
      </div>
    );
  }
}

MainBar.propTypes = {
  track: PropTypes.object,
  filter: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  className: PropTypes.string
};
