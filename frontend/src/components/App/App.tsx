import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { selectIsAuth } from '../../redux/reducers/serverConfigs/serverConfigs.slice';
import { getValidRoutes } from '../Routes';

const App: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const routes = useRoutes(getValidRoutes(isAuth));

  return routes;
};

export default App;
