import classNames from 'classnames';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useIsMobile } from '../../../helpers/hooks.helpers';
import { selectIsSidebarOpen } from '../../../redux/reducers/appConfigs/appConfigs.slice';

import classes from './NrgLogo.module.scss';

const NrgLogo: FC = () => {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const isMobile = useIsMobile();

  return (
    <Link to='/' className={classes.logoLink}>
      <div
        className={classNames(classes.logoContainer, 'transition', {
          [classes.logo]: isSidebarOpen && !isMobile,
          [classes.logoMin]: !isSidebarOpen || isMobile,
        })}
      />
    </Link>
  );
};

export default NrgLogo;
