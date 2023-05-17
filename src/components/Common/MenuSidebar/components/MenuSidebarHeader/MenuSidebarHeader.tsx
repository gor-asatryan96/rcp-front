import { FC } from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';

import NrgLogo from 'components/Common/NrgLogo/NrgLogo';
import { useIsMobile } from 'helpers/hooks.helpers';
import { useAppDispatch } from 'redux/hooks/redux.hooks';
import { toggleMenuSidebar } from 'redux/reducers/appConfigs/appConfigs.slice';

import classes from './MenuSidebarHeader.module.scss';

const MenuSidebarHeader: FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const closeBurger = () => {
    dispatch(toggleMenuSidebar(false));
  };
  return (
    <div className={classes.sidebarHeader}>
      <NrgLogo />
      {isMobile && (
        <div className={classes.closeIconWrapper}>
          <MenuFoldOutlined
            onClick={closeBurger}
            className={classes.closeIcon}
          />
        </div>
      )}
    </div>
  );
};

export default MenuSidebarHeader;
