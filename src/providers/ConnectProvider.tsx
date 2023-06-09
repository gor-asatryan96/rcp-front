import { FC, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

import GlobalLoader from 'components/Common/GlobalLoader/GlobalLoader';
import { useAppDispatch } from 'redux/hooks/redux.hooks';
import {
  selectIsConnected,
  setIsConnected,
} from 'redux/reducers/serverConfigs/serverConfigs.slice';
import {
  applyInvitationThunk,
  loginByTokenThunk,
} from 'redux/reducers/serverConfigs/serverConfigs.thunks';

dayjs.extend(utc);
dayjs.extend(timezone);

const ConnectProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isConnected = useSelector(selectIsConnected);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    const invitationToken = searchParams.get('invitation-token');
    if (invitationToken) {
      dispatch(applyInvitationThunk(invitationToken));
    } else if (storageToken) {
      dispatch(loginByTokenThunk(storageToken));
    } else {
      dispatch(setIsConnected());
    }
  }, []);

  if (!isConnected) return <GlobalLoader />;

  return <>{children}</>;
};

export default ConnectProvider;
