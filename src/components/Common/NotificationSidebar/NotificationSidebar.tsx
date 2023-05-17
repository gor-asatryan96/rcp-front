import { Layout } from 'antd';
import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { useAppDispatch } from '../../../redux/hooks/redux.hooks';
import {
  selectIsNotificationSidebarOpen,
  toggleNotificationSidebar,
} from '../../../redux/reducers/appConfigs/appConfigs.slice';
import { useIsMobile } from '../../../helpers/hooks.helpers';
import NotificationTrigger from '../Header/components/NotificationTrigger/NotificationTrigger';

import classes from './NotificationSidebar.module.scss';
import Notifications from './Notifications/Notifications';

const NotificationSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useSelector(selectIsNotificationSidebarOpen);
  const isMobile = useIsMobile();

  const closeSidebar = () => {
    dispatch(toggleNotificationSidebar(false));
  };

  return (
    <>
      <div
        className={classNames(classes.background, {
          [classes.open]: isSidebarOpen,
        })}
        onClick={closeSidebar}
        role='presentation'
      />
      <Layout.Sider
        className={classes.sidebar}
        trigger={null}
        theme='light'
        collapsible
        collapsedWidth={0}
        width={isMobile ? '100%' : 400}
        collapsed={!isSidebarOpen}>
        <div className={classes.sidebarContent}>
          <div className={classes.sidebarHeader}>
            <CloseOutlined
              onClick={closeSidebar}
              className={classes.closeIcon}
            />
            <div className={classes.headerTitle}>Notifications</div>
            <NotificationTrigger isInSidebar />
          </div>
          <div className={classes.notificationsRoot}>
            <Notifications />
          </div>
        </div>
      </Layout.Sider>
    </>
  );
};

export default NotificationSidebar;
