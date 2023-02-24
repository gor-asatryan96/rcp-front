import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type PropTypes = {
  isTest: boolean;
  age: number;
};

const App: FC<PropTypes> = () => {
  const { t } = useTranslation();

  return <div className='App'>{t('name')}</div>;
};

export default App;
