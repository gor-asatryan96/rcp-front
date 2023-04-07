import { BellFilled } from '@ant-design/icons';
import { Badge } from 'antd';
import { FC } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { toggleNotificationSidebar } from 'redux/reducers/appConfigs/appConfigs.slice';

import classes from './NotificationTrigger.module.scss';

type PropTypes = {
  isInSidebar: boolean;
};

const NotificationTrigger: FC<PropTypes> = ({ isInSidebar = false }) => {
  const dispatch = useAppDispatch();

  const openNotificationSidebar = () => {
    dispatch(toggleNotificationSidebar(true));
  };

  return (
    <div
      onClick={openNotificationSidebar}
      onKeyDown={openNotificationSidebar}
      role='button'
      tabIndex={0}
      className={classNames(classes.root, {
        [classes.sidebar]: isInSidebar,
      })}>
      <Badge size='small' count={5}>
        <BellFilled type='primary' className={classes.trigger} />
      </Badge>
    </div>
  );
};

export default NotificationTrigger;
