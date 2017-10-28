// @flow weak

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import CloudUploadIcon from 'material-ui-icons/CloudUpload';

import styles from './MainBar.scss';
import UploadDialog from '../UploadDialog/UploadDialog';

export default class MainBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadOpen: false
    };
  }

  handleClickOpenUpload = () => {
    this.setState({
      uploadOpen: true
    });
  };

  handleDialogClose = () => {
    this.setState({
      uploadOpen: false
    });
  }

  render() {
    const {uploadOpen} = this.state;

    return (
      <div className={styles.root}>
        <AppBar position="static">
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
          </Toolbar>
        </AppBar>

        <UploadDialog open={uploadOpen} onClose={this.handleDialogClose}/>
      </div>
    );
  }
}
