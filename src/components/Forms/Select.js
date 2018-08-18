import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, Field } from 'redux-form';
import { Select, InputLabel, withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      root: {
        width: 166,
        height: 56,
        padding: '14px 0px 18px 16px',
        color: '#002f54',
        border: 'solid 1px #ced8ea',
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: 0,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: 0,
        },
      },
    },
  },
});

const renderSelect = ({
  name,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <InputLabel htmlFor="age-auto-width">{name}</InputLabel>
        <Select
          InputProps={{
            disableUnderline: true,
          }}
          id={name}
          label={label}
          onChange={(e, idx, value) => input.onChange(value)}
          {...input}
          {...custom}
        >
          {children}
        </Select>
      </MuiThemeProvider>
    </div>
  );
};

renderSelect.propTypes = {
  name: PropTypes.string,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node,
};

export class SelectForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, items } = this.props;
    return (
      <Field name={name} component={renderSelect} label={label}>
        {items.map((item, idx) => {
          return (
            <MenuItem key={idx} value={item.value}>
              {item.key}
            </MenuItem>
          );
        })}
      </Field>
    );
  }
}

SelectForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default SelectForm;
