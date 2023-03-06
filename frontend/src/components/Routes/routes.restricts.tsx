import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsPasswordChangeNeed } from 'redux/reducers/serverConfigs/serverConfigs.slice';

type PropTypes = {
  isPasswordPage: boolean;
  children: ReactNode;
};

export const PasswordChangeNeedRestrict: FC<PropTypes> = ({
  isPasswordPage,
  children,
}) => {
  const isPasswordChangeNeed = useSelector(selectIsPasswordChangeNeed);
  if (isPasswordPage && !isPasswordChangeNeed) return <Navigate to='/login' />;
  if (!isPasswordPage && isPasswordChangeNeed)
    return <Navigate to='/change-password' />;

  return <>{children}</>;
};
