import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Select, theme } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCountries,
  selectCountry,
} from 'redux/reducers/countries/countries.slice';
import { RootState } from 'redux/store.types';

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
  const { token } = theme.useToken();
  const isMobile = useIsMobile();
  const isSidebarOpen = useSelector(selectIsMenuSidebarOpen);
  const TriggerIcon = isSidebarOpen ? MenuFoldOutlined : MenuUnfoldOutlined;

  const countries = useSelector(selectCountries);
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry,
  );
  const onTriggerClick = () => {
    dispatch(toggleMenuSidebar(!isSidebarOpen));
  };

  const handleButtonSelect = (name: string) => {
    dispatch(selectCountry(name));
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
            value={selectedCountry}
            onChange={handleButtonSelect}
            showSearch
            className={classes.headerSelector}
            placeholder='Select project'
            options={countries.map(i => ({
              label: i,
              value: i,
            }))}
          />
          <NotificationTrigger isInSidebar={false} />
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
