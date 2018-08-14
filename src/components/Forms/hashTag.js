import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Chip } from '@material-ui/core';
import { fieldInputPropTypes, Field } from 'redux-form';

const renderInput = ({
  name,
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  //   console.log(input);
  //   console.log(label);
  //   console.log(custom);
  return (
    <TextField
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
  meta: PropTypes.object,
};

export class HashTag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, tags } = this.props;
    return (
      <div>
        {tags.map((tag, idx) => {
          return <Chip key={idx} label={`#${tag}`} color="primary" />;
        })}
        <Field name={name} component={renderInput} label={label} />
      </div>
    );
  }
}

HashTag.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tags: PropTypes.array,
};

export default HashTag;
