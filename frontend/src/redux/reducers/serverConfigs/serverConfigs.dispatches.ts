import { useSuperDispatch } from '../../hooks/redux.hooks';

import { getServerConfigsThunk } from './serverConfigs.thunks';

export const serverConfigsDispatches = {
  useGetConfigsThunk: () => useSuperDispatch(getServerConfigsThunk),
};
