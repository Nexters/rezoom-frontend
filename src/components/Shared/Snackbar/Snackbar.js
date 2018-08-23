import React from 'react';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { closeSnackbar } from '../../../store/Snackbar/Snackbar.store';
import autobind from 'autobind-decorator';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    opacity: 0.7,
    backgroundColor: '#364eda',
  },
  error: {
    opacity: 0.7,
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={[classes.icon, classes.iconVariant]} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

@connect(
  state => ({
    snackbar: state.snackbar.data,
    snackbarOpen: state.snackbar.open,
  }),
  {
    closeSnackbar,
  },
)
export class Snackbars extends React.Component {
  @autobind
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.props.closeSnackbar();
  }

  componentWillReceiveProps(nextProps) {
    const { snackbarOpen } = this.props;
    if (snackbarOpen !== nextProps.snackbarOpen) {
      if (nextProps.snackbarOpen) {
        setTimeout(() => {
          this.props.closeSnackbar();
        }, 3000);
      }
    }
  }

  render() {
    const { classes, snackbar, snackbarOpen } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={snackbar.variant}
            message={snackbar.message}
          />
        </Snackbar>
      </div>
    );
  }
}

Snackbars.propTypes = {
  classes: PropTypes.object,
  snackbar: PropTypes.object,
  snackbarOpen: PropTypes.bool,
  closeSnackbar: PropTypes.bool,
};

export default Snackbars;
