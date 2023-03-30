import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsPasswordChangeRequired } from 'redux/reducers/serverConfigs/serverConfigs.slice';

type PropTypes = {
  isPasswordPage: boolean;
  children: ReactNode;
};

export const PasswordChangeNeedRestrict: FC<PropTypes> = ({
  isPasswordPage,
  children,
}) => {
  const isPasswordChangeRequired = useSelector(selectIsPasswordChangeRequired);
  if (isPasswordPage && !isPasswordChangeRequired)
    return <Navigate to='/login' />;
  if (!isPasswordPage && isPasswordChangeRequired)
    return <Navigate to='/create-password' />;

  return <>{children}</>;
};
