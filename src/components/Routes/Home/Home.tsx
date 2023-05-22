import { FC, useEffect } from 'react';
import { Card, Divider, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  selectActiveProjectID,
  selectCountries,
  selectCountry,
} from 'redux/reducers/projects/projects.slice';
import { TProjectId } from 'redux/reducers/projects/projects.types';
import {
  getChooseProjectThunck,
  getProjectsThunk,
} from 'redux/reducers/projects/projects.thunks';
import { useAppDispatch } from 'redux/hooks/redux.hooks';

import classes from './Home.module.scss';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const countries = useSelector(selectCountries);
  const activeCountryId = useSelector(selectActiveProjectID);

  const handleButtonClick = (id: TProjectId) => {
    dispatch(selectCountry(id));
    dispatch(getChooseProjectThunck(id));
  };
  useEffect(() => {
    dispatch(getProjectsThunk());
  }, []);

  return (
    <>
      <Divider orientation='center'>{t('Select the project')}</Divider>
      <div className={classes.homeBody}>
        <Row className={classes.homeCountriesBody}>
          {countries.map(country => (
            <Card
              hoverable={country.id !== activeCountryId}
              key={country.id}
              className={
                country.id === activeCountryId
                  ? classes.activeCountry
                  : classes.countries
              }
              onClick={() => handleButtonClick(country.id)}>
              {country.project}
            </Card>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
