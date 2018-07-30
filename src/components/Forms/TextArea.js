import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { fieldInputPropTypes, Field } from 'redux-form';

const renderInput = ({
  name,
  input,
  label,
  rows,
  meta: { touched, error },
  ...custom
}) => {
  //   console.log(input);
  //   console.log(label);
  //   console.log(custom);
  return (
    <TextField
      defaultValue="react-bootstrap"
      multiline
      rows={rows}
      id={name}
      label={label} //   errorText={touched && error}
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
  meta: PropTypes.object,
};

export class TextArea extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, rows } = this.props;
    return (
      <Field name={name} component={renderInput} label={label} rows={rows} />
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
};

export default TextArea;
