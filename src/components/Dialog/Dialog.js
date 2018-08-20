import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import { Create } from '../Dialog/Create/Create';
import autobind from 'autobind-decorator';
import { dialogClose } from '../../store/Dialog/Dialog.store';

@connect(
  state => ({
    dialog: state.dialog.dialog,
  }),
  {
    dialogClose,
  },
)
export class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  renderDialog(data) {
    let component = null;

    if (data['isOpen']) {
      if (data['name'] === 'Create') {
        component = (
          <Create
            dialogOpen={data.isOpen}
            onDialogClose={this.props.dialogClose}
            mode={data.mode}
          />
        );
      }
    }

    return component;
  }

  render() {
    const { dialog } = this.props;
    let renderDialogComponent = this.renderDialog(dialog);

    return <div>{renderDialogComponent}</div>;
  }
}

Dialog.propTypes = {
  dialog: PropTypes.object,
  dialogClose: PropTypes.func,
};

export default Dialog;
