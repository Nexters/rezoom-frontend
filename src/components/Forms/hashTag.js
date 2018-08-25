import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Chip, withStyles, Button } from '@material-ui/core';
import { fieldInputPropTypes, Field } from 'redux-form';
import autobind from 'autobind-decorator';

const renderInput = ({
  name,
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      id={name}
      label={label} //   errorText={touched && error}
      {...input}
      {...custom}
      style={{ display: 'none' }}
    />
  );
};

renderInput.propTypes = {
  name: PropTypes.string,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};

const styles = {
  chip: {
    height: 41,
    borderRadius: 20.5,
    backgroundColor: '#ffffff',
    border: 'solid 1px #ced8ea',
    marginRight: 12,
    marginBottom: 8,
  },
};
@withStyles(styles)
export class HashTag extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  onClickAddHashTag() {
    this.props.onClickAddHashTag();
  }

  render() {
    const { name, label, tags, classes } = this.props;
    return (
      <div>
        {tags.map((tag, idx) => {
          return (
            <Chip
              className={classes.chip}
              key={idx}
              label={`#${tag}`}
              color="primary"
            />
          );
        })}
        <Field name={name} component={renderInput} label={label} />
        <Button
          variant="contained"
          color="primary"
          onClick={e => this.onClickAddHashTag(e)}
        >
          + 해시태그 편집
        </Button>
      </div>
    );
  }
}

HashTag.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tags: PropTypes.array,
  classes: PropTypes.object,
  onClickAddHashTag: PropTypes.func,
};

export default HashTag;
