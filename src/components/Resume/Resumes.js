import React, { Component } from 'react';
import connect from 'redux-connect-decorator';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import scss from './Resumes.scss';
import {
  Button,
  Input,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import loadingInjector from '../../hocs/withLoading';
import { Sidebar } from '../Shared/Sidebar/Sidebar';
import { changeActiveMenu } from '../../store/Sidebar/Sidebar.store';

@connect(
  state => ({
    sidebarMenus: state.sidebar.menu.resume,
    resumeList: state.resume.resumes,
  }),
  {
    changeActiveMenu,
  },
)
@loadingInjector(true)
export class Resumes extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onClickMenu = this.onClickMenu.bind(this);
  }

  onClickMenu(selectedId) {
    this.props.changeActiveMenu(selectedId, 'RESUME');
  }

  render() {
    const { sidebarMenus, resumeList } = this.props;

    return (
      <div className={scss.resumes}>
        <Sidebar
          btnTitle={'자소서 작성'}
          list={sidebarMenus}
          onClick={this.onClickMenu}
        />
        <div className={scss['resumes__contents']}>
          <div className={scss['resumes__contents--search']}>
            <Input type="text" placeholder="자소서 보기" />
          </div>
          <div className={scss['resumes__contents--header']}>
            <div className={scss['title']}>
              <p>합격한 자소서</p>
            </div>
            <div className={scss['action']}>
              <p>카드형식</p>
              <p>리스트형식</p>
            </div>
          </div>
          <div className={scss['resumes__contents--list']}>
            {resumeList.map(item => {
              return (
                <Link key={item.id} className="" to={`/resume/${item.id}`}>
                  <Card>
                    <CardContent>
                      <Typography variant="headline" component="h2">
                        {item.title}
                      </Typography>
                      <Typography component="p">{item.content}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Resumes.propTypes = {
  sidebarMenus: PropTypes.array,
  changeActiveMenu: PropTypes.func,
  resumeList: PropTypes.array,
};

export default Resumes;
