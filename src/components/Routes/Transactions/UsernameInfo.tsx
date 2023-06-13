import { FC } from 'react';

import { parseJSON } from 'helpers/utils';

import { MetaInfoType } from './MetaInfo';

type Proptypes = {
  data: string;
};

const UsernameInfo: FC<Proptypes> = ({ data }) => {
  const parseMetaInfo: MetaInfoType = parseJSON(data);
  if (!parseMetaInfo) return null;

  return <div>{parseMetaInfo.sa_username}</div>;
};

export default UsernameInfo;
