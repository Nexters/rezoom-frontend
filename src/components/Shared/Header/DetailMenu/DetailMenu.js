import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import autobind from 'autobind-decorator';
import { selectedQuestion } from '../../../../store/Resume/Resume.store';
import scss from './DetailMenu.scss';

@connect(
  state => ({}),
  { selectedQuestion },
)
export class DetailMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [1, 2, 3],
      selectedQuestion: 1,
    };
  }

  @autobind
  onClickQuestion(e, id) {
    e.stopPropagation();
    const { props } = this;
    console.log('onClickQuestion ! ', id);
    this.setState({
      selectedQuestion: id,
    });
    this.props.selectedQuestion(id);
  }

  render() {
    const { list, selectedQuestion } = this.state;
    return (
      <div className={scss['detail__sidebar']}>
        <div className={scss['detail__sidebar--header']}>
          <p>문항</p>
          <Button variant="outlined" color="primary">
            삭제
          </Button>
        </div>
        <ul>
          {list.map(item => {
            // console.log(item);
            return (
              <li
                key={item}
                style={{ color: selectedQuestion === item ? 'red' : 'black' }}
                // className={item.active ? scss['sidebar__active'] : ''}
                onClick={e => this.onClickQuestion(e, item)}
              >
                {item}
              </li>
            );
          })}
        </ul>
        <Button variant="outlined" color="primary">
          + 문항추가
        </Button>
      </div>
    );
  }
}

DetailMenu.propTypes = {
  selectedQuestion: PropTypes.func,
};

export default DetailMenu;
