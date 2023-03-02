import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { useIsMobile } from '../../../helpers/hooks.helpers';
import { useAppDispatch } from '../../../redux/hooks/redux.hooks';
import {
  selectIsSidebarOpen,
  toggleSidebar,
} from '../../../redux/reducers/appConfigs/appConfigs.slice';
import NrgLogo from '../NrgLogo/NrgLogo';

import classes from './Header.module.scss';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();
  const isMobile = useIsMobile();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const CurrentIcon =
    isSidebarOpen || isMobile ? MenuFoldOutlined : MenuUnfoldOutlined;

  const onTriggerClick = () => {
    dispatch(toggleSidebar(!isSidebarOpen));
  };

  return (
    <Layout.Header style={{ padding: 0, background: token.colorBgContainer }}>
      <div className={classes.headerActions}>
        {isMobile && <NrgLogo />}
        <CurrentIcon className={classes.trigger} onClick={onTriggerClick} />
      </div>
    </Layout.Header>
  );
};

export default Header;
