import { FC, useMemo } from 'react';
import { Menu as AntMenu } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { getValidMenuItems } from 'components/Routes';
import { MenuItem } from 'components/Routes/routes.types';
import { toggleMenuSidebar } from 'redux/reducers/appConfigs/appConfigs.slice';
import { useIsMobile } from 'helpers/hooks.helpers';

import {
  logout,
  selectUserAcl,
} from '../../../redux/reducers/serverConfigs/serverConfigs.slice';
import { useAppDispatch } from '../../../redux/hooks/redux.hooks';

const Menu: FC = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const acl = useSelector(selectUserAcl);

  const menuItems: MenuItem[] = useMemo(
    () => [
      ...getValidMenuItems(acl),
      {
        key: 'logout',
        icon: <PoweroffOutlined />,
        label: 'Sign out',
        onClick: () => dispatch(logout()),
      },
    ],
    [acl],
  );

  const onNavSelect = (e: { key: string }) => {
    if (e.key !== 'logout') {
      navigate(e.key);
      if (isMobile) {
        dispatch(toggleMenuSidebar(false));
      }
    }
  };

  return (
    <AntMenu
      theme='dark'
      mode='inline'
      selectedKeys={[pathname]}
      items={menuItems}
      onSelect={onNavSelect}
    />
  );
};

export default Menu;
