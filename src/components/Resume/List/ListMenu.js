import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import autobind from 'autobind-decorator';
import { dialogOpen } from '../../../store/Dialog/Dialog.store';
import { deleteResume } from '../../../store/Resume/Resume.store';

@connect(
  state => ({}),
  {
    deleteResume,
    dialogOpen,
  },
)
export class ListMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  @autobind
  handleClick(e) {
    e.stopPropagation();
    this.setState({ anchorEl: e.currentTarget, open: true });
  }

  @autobind
  handleClose(e, isMode) {
    const { deleteResume, resumeId, dialogOpen } = this.props;
    if (isMode === 'delete') {
      deleteResume(resumeId);
    } else if (isMode === 'edit') {
      dialogOpen('/resume', 'Edit', resumeId);
    }
    this.setState({ anchorEl: null, open: false });
  }

  render() {
    const { open, anchorEl } = this.state;

    return (
      <div style={{ position: 'absolute', right: 28, top: 36 }}>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={e => this.handleClick(e)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={e => this.handleClose(e, 'close')}
        >
          <MenuItem onClick={e => this.handleClose(e, 'delete')}>삭제</MenuItem>
          <MenuItem onClick={e => this.handleClose(e, 'edit')}>
            정보 수정
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

ListMenu.propTypes = {
  resumeId: PropTypes.number,
  deleteResume: PropTypes.func,
  dialogOpen: PropTypes.func,
};

export default ListMenu;
