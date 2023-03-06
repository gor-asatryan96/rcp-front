import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

import GlobalLoader from '../components/Common/GlobalLoader/GlobalLoader';
import { useAppDispatch } from '../redux/hooks/redux.hooks';
import {
  selectIsConnected,
  setIsConnected,
} from '../redux/reducers/serverConfigs/serverConfigs.slice';
import { loginByTokenThunk } from '../redux/reducers/serverConfigs/serverConfigs.thunks';

type PropTypes = {
  children: ReactNode;
};

const ConnectProvider: FC<PropTypes> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isConnected = useSelector(selectIsConnected);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginByTokenThunk(token));
    } else {
      dispatch(setIsConnected());
    }
  }, []);

  if (!isConnected) return <GlobalLoader />;

  return <>{children}</>;
};

export default ConnectProvider;
