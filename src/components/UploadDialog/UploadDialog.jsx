import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {LinearProgress} from 'material-ui/Progress';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import api from '../../services/api.service';

import styles from './UploadDialog.scss';

export default class UploadDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fileName: '',
      progress: false
    };
  }

  handleRequestClose = () => {
    this.props.onClose();
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  handleFileClick = () => {
    this.fileInput.click();
  }

  handleFileChange = (event) => {
    const file = event.target.files && event.target.files.length === 1 ? event.target.files[0] : null;

    this.setState({
      fileName: file ? file.name : null,
      file: file
    });
  };

  handleRequestSubmit = (event) => {
    const {name, file} = this.state;

    if (name && file) {
      this.setState({
        progress: true
      });

      api.upload({name, file})
        .then(() => {
          console.log('uploaded');
          this.setState({
            progress: false
          });
        })
        .catch((error) => {
          console.log('error', error);
          this.setState({
            progress: false
          });
        });
    }

    event.preventDefault();
  }

  render = () => {
    const {file, fileName, name, progress} = this.state;

    return (
      <form onSubmit={this.handleRequestSubmit}>
        <Dialog
          ignoreBackdropClick={true}
          ignoreEscapeKeyUp={true}
          open={this.props.open}
          transition={<Slide direction="up"/>}
          keepMounted
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>Upload GPX</DialogTitle>
          <DialogContent className={styles.content}>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Track name"
              type="text"
              disabled={progress}
              onChange={this.handleNameChange}
              fullWidth
            />
            <Button raised
              color="primary"
              className={styles.uploadButton}
              onClick={this.handleFileClick}
              disabled={progress}>
              {fileName ? fileName : 'SELECT FILE'}
            </Button>
            <div className={styles.hidden}>
              <TextField
                inputRef={(ref) => this.fileInput = ref}
                type="file"
                onChange={this.handleFileChange}
                inputProps={{accept: '.gpx'}}
                disabled={progress}
                fullWidth
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose}
              type="button"
              disabled={progress}>
              Cancel
            </Button>
            <Button onClick={this.handleRequestSubmit}
              disabled={!file || !name || progress}
              color="primary">
              Upload
            </Button>
          </DialogActions>
          {progress ? <LinearProgress/> : null}
        </Dialog>
      </form>
    );
  }
}

UploadDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};
