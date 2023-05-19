import { FC } from 'react';
import { Card, Divider, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'redux/store.types';
import { selectCountry } from 'redux/reducers/countries/countries.slice';

import classes from './Home.module.scss';

const Home: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const countries = useSelector(
    (state: RootState) => state.countries.countriesName,
  );
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry,
  );
  // const [homeData, setHomeData] = useState();

  const handleButtonSelect = (name: string) => {
    dispatch(selectCountry(name));
  };

  const handleButtonClick = (name: string) => {
    handleButtonSelect(name);
  };

  // useEffect(() => {
  //   axios.post('/home/project/list').then(data => {
  //     setHomeData(data.data);
  //   });
  // }, []);
  return (
    <>
      <Divider orientation='center'>{t('Select the project')}</Divider>
      <div className={classes.homeBody}>
        <Row className={classes.homeCountriesBody}>
          {countries.map(country => (
            <Card
              hoverable={country !== selectedCountry}
              key={country}
              className={
                country === selectedCountry
                  ? classes.activeCountry
                  : classes.countries
              }
              onClick={() => handleButtonClick(country)}>
              {country}
            </Card>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
