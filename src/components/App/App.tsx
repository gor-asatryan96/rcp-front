import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { selectIsCountryChoosen } from 'redux/reducers/projects/projects.slice';

import {
  selectIsAuth,
  selectUserAcl,
} from '../../redux/reducers/serverConfigs/serverConfigs.slice';
import { getValidRoutes } from '../Routes';

import { useAppSideEffects } from './app.hooks';

const App: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const acl = useSelector(selectUserAcl);
  const isProjectChoosen = useSelector(selectIsCountryChoosen);

  const routes = useRoutes(getValidRoutes(isAuth, acl, isProjectChoosen));

  useAppSideEffects();

  return routes;
};

export default App;
