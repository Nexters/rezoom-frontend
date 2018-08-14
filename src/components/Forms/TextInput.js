import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, FormControl, InputLabel, Input } from '@material-ui/core';
import { fieldInputPropTypes, Field } from 'redux-form';

const renderInput = ({
  name,
  input,
  label,
  type,
  fullWidth,
  meta: { touched, error },
  ...custom
}) => {
  //   console.log(input);
  //   console.log(label);
  //   console.log(custom);
  // return (
  //   <TextField
  //     id={name}
  //     label={label} //   errorText={touched && error}
  //     {...input}
  //     {...custom}
  //   />
  // );
  let autoComplete = 'text';
  if (type === 'text') {
    autoComplete = 'text';
  } else if (type === 'password') {
    autoComplete = 'current-password';
  } else if (type === 'email') {
    autoComplete = 'email';
  }
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input name={name} type={name} id={type} autoComplete={autoComplete} />
    </FormControl>
  );
};

renderInput.propTypes = {
  name: PropTypes.string,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export class TextInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, type, fullWidth } = this.props;
    return (
      <Field
        name={name}
        component={renderInput}
        label={label}
        type={type}
        fullWidth={fullWidth}
      />
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default TextInput;
