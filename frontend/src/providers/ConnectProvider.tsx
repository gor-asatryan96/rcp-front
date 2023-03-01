import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

import GlobalLoader from '../components/common/GlobalLoader/GlobalLoader';
import { serverConfigsDispatches } from '../redux/reducers/serverConfigs/serverConfigs.dispatches';
import { selectIsConnected } from '../redux/reducers/serverConfigs/serverConfigs.slice';

type PropTypes = {
  children: ReactNode;
};

const ConnectProvider: FC<PropTypes> = ({ children }) => {
  const loginByToken = serverConfigsDispatches.useLoginByToken();
  const setIsConnected = serverConfigsDispatches.useSetIsConnected();
  const isConnected = useSelector(selectIsConnected);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loginByToken(token);
    } else {
      setIsConnected();
    }
  }, []);

  if (!isConnected) return <GlobalLoader />;

  return <>{children}</>;
};

export default ConnectProvider;
