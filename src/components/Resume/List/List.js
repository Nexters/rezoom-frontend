import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import { Link } from 'react-router-dom';
import { Card, Grid, Button } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import scss from './List.scss';
import { ListItemInfo } from './ListItemInfo';
import { ListMenu } from './ListMenu';
import emptyImage from '../../../static/images/item/newdocument.svg';
import { dialogOpen } from '../../../store/Dialog/Dialog.store';
import autobind from 'autobind-decorator';
import passLabel from '../../../static/images/label/ic-status-label-pass.svg';
import failedLabel from '../../../static/images/label/ic-status-label-failed.svg';
// import passLabel from '../../../static/images/label/ic-status-label-pass.svg';

@connect(
  state => ({}),
  {
    dialogOpen,
  },
)
export class List extends Component {
  static propTypes = {
    resumeList: PropTypes.any,
    dialogOpen: PropTypes.func,
  };

  @autobind
  onClickCreatButton() {
    this.props.dialogOpen('/resume', 'Create', 0);
  }

  render() {
    const { resumeList } = this.props;

    return (
      <Scrollbars
        autoHide
        autoHideTimeout={100}
        autoHideDuration={100}
        autoHeightMin={'100%'}
        autoHeightMax={'100%'}
        thumbMinSize={30}
        universal={true}
        className={scss['resumes__contents--list']}
        // style={{flex: 1, order : 2}}
      >
        {resumeList.length === 0 ? (
          <div className={scss['resumes__contents--empty']}>
            <img src={emptyImage} alt="empty" />
            <h5> 새 자소서를 작성해 주세요. </h5>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onClickCreatButton}
            >
              자소서 작성하기
            </Button>
          </div>
        ) : (
          <Grid
            container
            spacing={24}
            className={scss['resumes__contents--box']}
          >
            {resumeList.map((item, idx) => {
              let label, labelText;
              if (item.passFlag === 0) {
                label = failedLabel;
                labelText = '불합격';
              } else if (item.passFlag === 1) {
                label = passLabel;
                labelText = '합격';
              }

              return (
                <Grid
                  item
                  lg={6}
                  sm={12}
                  xs={12}
                  key={idx}
                  style={{ position: 'relative', marginBottom: 22 }}
                >
                  <ListMenu resumeId={item.resumeId} />
                  <Link to={`/resume/detail/${item.resumeId}`}>
                    <div className={scss.label}>
                      {item.passFlag !== 2 ? (
                        <img src={label} alt="card label" />
                      ) : null}
                      {item.passFlag !== 2 ? <p>{labelText}</p> : null}
                    </div>
                    <Card className={scss['card']}>
                      <div className={scss['list__header']}>
                        <p>{item.companyName}</p>
                      </div>
                      <ListItemInfo
                        applicationType={item.applicationType}
                        applicationYear={item.applicationYear}
                        halfType={item.halfType}
                        finishFlag={item.finishFlag}
                      />
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Scrollbars>
    );
  }
}

export default List;
