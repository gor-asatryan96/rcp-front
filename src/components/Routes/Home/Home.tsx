import { FC } from 'react';
import { Card, Divider, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCountry,
  setActiveCountry,
} from 'redux/reducers/countries/countries.slice';

import classes from './Home.module.scss';

const Home: FC = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountry);
  const { t } = useTranslation();

  const handleButtonClick = (name: string) => {
    dispatch(setActiveCountry(name));
  };
  return (
    <>
      <Divider orientation='left'>{t('Select the project')}</Divider>
      <Card>
        <Row className={classes.homeCountriesBody}>
          {countries.map(country => (
            <Card
              key={country.key}
              className={
                country.isActive ? classes.activeCountry : classes.countries
              }
              onClick={() => handleButtonClick(country.countryName)}>
              {country.countryName}
            </Card>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default Home;
