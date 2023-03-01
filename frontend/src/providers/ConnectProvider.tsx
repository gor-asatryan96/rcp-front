import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

import GlobalLoader from '../components/common/GlobalLoader/GlobalLoader';
import { serverConfigsDispatches } from '../redux/reducers/serverConfigs/serverConfigs.dispatches';
import { selectIsServerConfigsLoading } from '../redux/reducers/serverConfigs/serverConfigs.slice';

type PropTypes = {
  children: ReactNode;
};

const ConnectProvider: FC<PropTypes> = ({ children }) => {
  const loginByToken = serverConfigsDispatches.useLoginByToken();
  const setIsConnected = serverConfigsDispatches.useSetIsConnected();
  const isLoading = useSelector(selectIsServerConfigsLoading);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loginByToken(token);
    } else {
      setIsConnected();
    }
  }, []);

  if (isLoading) return <GlobalLoader />;

  return <>{children}</>;
};

export default ConnectProvider;
