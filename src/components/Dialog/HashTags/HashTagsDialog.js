import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import autobind from 'autobind-decorator';
import { HashTag } from '../../Forms/hashTag';
import { Chip } from '@material-ui/core';

@connect(
  state => ({}),
  {},
)
export class HashTagsDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dialogOpen, tags } = this.props;

    return (
      <div>
        <Dialog open={dialogOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">자소서 작성</DialogTitle>
          <DialogContent>
            <div>
              <div>
                {tags.map(item => {
                  return <Chip key={idx} label={`#${tag}`} color="primary" />;
                })}
              </div>
            </div>
            {/* <HashTag name={'hashTags'} label={'해시태그'} tags={tags} /> */}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary">
              다음
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

HashTagsDialog.propTypes = {
  dialogOpen: PropTypes.bool,
  onDialogClose: PropTypes.func,
  tags: PropTypes.array,
};

export default HashTagsDialog;
