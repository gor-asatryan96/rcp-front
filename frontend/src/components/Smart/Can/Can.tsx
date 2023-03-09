import { FC, ReactNode } from 'react';

import { IAclPath } from 'components/Routes/routes.types';
import { selectIsAclExist } from 'redux/reducers/serverConfigs/serverConfigs.slice';
import { useAppSelector } from 'redux/hooks/redux.hooks';

type PropTypes = {
  aclPath: IAclPath;
  children: ReactNode;
};

const Can: FC<PropTypes> = ({ aclPath, children }) => {
  const isAclExist = useAppSelector(state => selectIsAclExist(state, aclPath));

  if (!isAclExist) return null;

  return <>{children}</>;
};

export default Can;
