import { useSuperDispatch } from '../../hooks/redux.hooks';

import { setIsConnected } from './serverConfigs.slice';
import { loginThunk, loginByTokenThunk } from './serverConfigs.thunks';

export const serverConfigsDispatches = {
  useLogin: () => useSuperDispatch(loginThunk),
  useLoginByToken: () => useSuperDispatch(loginByTokenThunk),
  useSetIsConnected: () => useSuperDispatch(setIsConnected),
};
