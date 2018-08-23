import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  Chip,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import scss from './QuestionsList.scss';

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        height: 41,
        borderRadius: 20.5,
        backgroundColor: '#ffffff',
        border: 'solid 1px #ced8ea',
        marginRight: 6,
      },
    },
  },
});

export class QuestionsList extends Component {
  render() {
    const { searchQuestionsList, searchMode } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Scrollbars
          autoHide
          autoHideTimeout={100}
          autoHideDuration={100}
          autoHeightMin={'100%'}
          autoHeightMax={'100%'}
          thumbMinSize={30}
          universal={true}
          className={scss['resumes__contents--list']}
        >
          {searchQuestionsList.length === 0 ? (
            <div>
              <h1> 데이터 없음 </h1>
            </div>
          ) : (
            <Grid
              container
              spacing={24}
              className={scss['resumes__contents--box']}
            >
              {searchQuestionsList.map((item, idx) => {
                return (
                  <Grid item lg={6} sm={12} xs={12} key={idx}>
                    <Link to={`/resume/detail/${item.resumeId}`}>
                      <Card className={scss['card']}>
                        <div className={scss['list__header']}>
                          <p>{item.companyName}</p>
                        </div>
                        <div className={scss['list__bottom']}>
                          <p>{item.jobType}</p>
                        </div>
                        <div className={scss['list__question']}>
                          <p>{item.title}</p>
                        </div>
                        <div className={scss['list__hashtag']}>
                          {item.hashTags.map((tag, idx) => {
                            return (
                              <Chip
                                key={idx}
                                label={`#${tag}`}
                                color="primary"
                              />
                            );
                          })}
                        </div>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Scrollbars>
      </MuiThemeProvider>
    );
  }
}

QuestionsList.propTypes = {
  searchQuestionsList: PropTypes.array,
  searchMode: PropTypes.string,
};

export default QuestionsList;
