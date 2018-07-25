import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import scss from './Sidebar.scss';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  onClickMenu(e, selectedId) {
    e.stopPropagation();
    this.props.onClickMenu(selectedId);
  }

  onClickChildrenMenu(e, selectedChildrenId) {
    e.stopPropagation();
    this.props.onClickChildren(selectedChildrenId);
  }

  render() {
    const { btnTitle, list } = this.props;
    return (
      <div className={scss['sidebar']}>
        <Button color="primary" onClick={this.props.onClickButton}>
          {btnTitle}
        </Button>
        <ul>
          {list.map(item => {
            // console.log(item);
            return (
              <li
                key={item.id}
                className={item.active ? scss['sidebar__active'] : ''}
                onClick={e => this.onClickMenu(e, item.id)}
              >
                {item.name}
                {item.children.length > 0 ? (
                  <ul>
                    {item.children.map(node => {
                      return (
                        <li
                          key={node.id}
                          className={
                            node.active
                              ? scss['sidebar__children--active']
                              : scss['sidebar__children']
                          }
                          onClick={e => this.onClickChildrenMenu(e, node.id)}
                        >
                          {node.name}
                        </li>
                      );
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
  onClickMenu: PropTypes.func,
  onClickChildren: PropTypes.func,
  onClickButton: PropTypes.func,
};

export default Sidebar;
