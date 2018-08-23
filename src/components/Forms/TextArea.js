import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';
import { fieldInputPropTypes, Field } from 'redux-form';
import autobind from 'autobind-decorator';

const renderInput = ({
  name,
  input,
  rows,
  rowsMax,
  classes,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      defaultValue="react-bootstrap"
      multiline
      InputProps={{
        disableUnderline: true,
        classes: {
          root: classes.root,
        },
        maxLength: 1000,
      }}
      rows={rows}
      rowsMax={rowsMax}
      maxLength={1000}
      id={name}
      {...input}
      {...custom}
    />
  );
};

renderInput.propTypes = {
  name: PropTypes.string,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.string,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  meta: PropTypes.object,
  classes: PropTypes.object,
};

const styles = {
  root: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#001322',
  },
};
@withStyles(styles)
export class TextArea extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  onChangeTextArea(event, newValue, previousValue) {
    const { updateText, name } = this.props;
    updateText(newValue, name);
  }

  render() {
    const { name, rows, classes, rowsMax } = this.props;
    return (
      <Field
        name={name}
        component={renderInput}
        rows={rows}
        rowsMax={rowsMax}
        classes={classes}
        onChange={this.onChangeTextArea}
      />
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  rowsMax: PropTypes.number.isRequired,
  classes: PropTypes.object,
  updateText: PropTypes.func,
};

export default TextArea;
