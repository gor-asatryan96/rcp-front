import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Select, theme } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  selectActiveProjectID,
  selectCountries,
} from 'redux/reducers/projects/projects.slice';
import { TProjectId } from 'redux/reducers/projects/projects.types';
import { getChooseProjectThunck } from 'redux/reducers/projects/projects.thunks';

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
  const activeProjectId = useSelector(selectActiveProjectID);
  const onTriggerClick = () => {
    dispatch(toggleMenuSidebar(!isSidebarOpen));
  };

  const handleButtonSelect = (id: TProjectId) => {
    dispatch(getChooseProjectThunck(id));
  };

  const validCountries = countries.filter(country => country.is_active);

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
            value={activeProjectId}
            onChange={handleButtonSelect}
            showSearch
            className={classes.headerSelector}
            placeholder='Select project'
            options={validCountries.map(country => ({
              label: country.project,
              value: country.id,
            }))}
          />
          <NotificationTrigger isInSidebar={false} />
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
