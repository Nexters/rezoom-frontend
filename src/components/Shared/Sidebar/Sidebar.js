import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import scss from './Sidebar.scss';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { btnTitle, list } = this.props;
    return (
      <div className={scss['sidebar']}>
        <Button color="primary">{btnTitle}</Button>
        <ul>
          {list.map(item => {
            // console.log(item);
            return (
              <li
                key={item.id}
                className={item.id === true ? 'sidebar__active' : ''}
              >
                {item.name}
                {item.children.length > 0 ? (
                  <ul>
                    {item.children.map(node => {
                      return <li key={node.id}>{node.name}</li>;
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  btnTitle: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};

export default Sidebar;
