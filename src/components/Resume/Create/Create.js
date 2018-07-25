import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, reduxForm } from 'redux-form';

@reduxForm({ form: 'contact' })
export class Create extends Component {
  render() {
    const { dialogOpen, handleSubmit } = this.props;
    return (
      <div>
        <Dialog
          open={dialogOpen}
          onClose={this.props.onDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" component="input" type="text" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" component="input" type="text" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="email" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.onDialogClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Create.propTypes = {
  dialogOpen: PropTypes.bool,
  onDialogClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default Create;
