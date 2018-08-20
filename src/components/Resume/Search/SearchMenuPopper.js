import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import scss from './Search.scss';
import autobind from 'autobind-decorator';

export class SeacrhMenuPopper extends Component {
  @autobind
  handleClose(e, id) {
    e.stopPropagation();
    this.props.closeSearchMenuPopper(e, id);
  }

  render() {
    const { menusOpen, menusAnchorEl } = this.props;
    return (
      <Popper
        open={menusOpen}
        anchorEl={menusAnchorEl}
        transition
        disablePortal
        className={scss['search__change--menus']}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={e => this.handleClose(e, 2)}>
                <MenuList>
                  <MenuItem onClick={e => this.handleClose(e, 0)}>
                    자소서 리스트
                  </MenuItem>
                  <MenuItem onClick={e => this.handleClose(e, 1)}>
                    문항 리스트
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  }
}

SeacrhMenuPopper.propTypes = {
  closeSearchMenuPopper: PropTypes.func,
  menusOpen: PropTypes.bool,
  menusAnchorEl: PropTypes.object,
};

export default SeacrhMenuPopper;
