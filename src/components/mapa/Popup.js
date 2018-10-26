import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Popup.css'

export default class Popup extends React.Component {
  render() {
    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div id='divAvatar'>
          <Avatar className='bigAvatar' alt={this.props.userName} src={this.props.srcPhoto} />
        </div>
        <DialogTitle id="form-dialog-title">Obrigado {this.props.userName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Quando marcamos show ai, avisaremos no seu email :)
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closePopup} color="primary">
            Ok
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}