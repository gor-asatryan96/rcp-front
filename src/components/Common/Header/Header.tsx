import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Select, theme } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCountry,
  setActiveCountry,
} from 'redux/reducers/countries/countries.slice';

import { useIsMobile } from '../../../helpers/hooks.helpers';
import { useAppDispatch } from '../../../redux/hooks/redux.hooks';
import {
  selectIsMenuSidebarOpen,
  toggleMenuSidebar,
} from '../../../redux/reducers/appConfigs/appConfigs.slice';
import NrgLogo from '../NrgLogo/NrgLogo';

import classes from './Header.module.scss';
import NotificationTrigger from './components/NotificationTrigger/NotificationTrigger';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const countries = useSelector(selectCountry);
  const { token } = theme.useToken();
  const isMobile = useIsMobile();
  const isSidebarOpen = useSelector(selectIsMenuSidebarOpen);
  const TriggerIcon = isSidebarOpen ? MenuFoldOutlined : MenuUnfoldOutlined;

  const onTriggerClick = () => {
    dispatch(toggleMenuSidebar(!isSidebarOpen));
  };

  const handleButtonClick = (name: string) => {
    dispatch(setActiveCountry(name));
  };
  return (
    <Layout.Header
      style={{ background: token.colorBgContainer }}
      className={classes.root}>
      <div className={classes.headerActions}>
        <div className={classes.headerLeftActions}>
          <TriggerIcon className={classes.trigger} onClick={onTriggerClick} />
        </div>
        {isMobile && <NrgLogo />}
        <div className={classes.headerRightActions}>
          <Select
            onChange={handleButtonClick}
            showSearch
            className={classes.headerSelector}
            placeholder='Select project'
            options={countries.map(i => ({
              label: i.countryName,
              value: i.countryName,
            }))}
          />
          <NotificationTrigger isInSidebar={false} />
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
