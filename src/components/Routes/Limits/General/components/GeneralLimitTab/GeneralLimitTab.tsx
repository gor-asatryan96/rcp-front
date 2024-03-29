import { FC } from 'react';
import { Col, Form, InputNumber, Popover, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import classes from './GeneralLimitTab.module.scss';
import { IGeneraList } from './GeneralLimitTab.type';

type PropTypes = {
  data: IGeneraList | undefined;
};
const layout = {
  xs: { span: 12 },
  lg: { span: 12 },
  xl: { span: 4 },
  xxl: { span: 6 },
};
const GeneralLimitTab: FC<PropTypes> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col {...layout}>
          <Form.Item label='Withdraw Limit'>
            <InputNumber
              disabled
              style={{
                width: '100%',
              }}
              value={data?.daily_withdraw_limit}
              readOnly
            />
          </Form.Item>
        </Col>
        <Col {...layout}>
          <Form.Item label='Rollback Limit'>
            <InputNumber
              disabled
              prefix='%'
              style={{
                width: '100%',
              }}
              value={data?.rollback_limit_percentage}
              readOnly
            />
          </Form.Item>
        </Col>
        <Col {...layout}>
          <Popover
            trigger='hover'
            placement='topLeft'
            content='Deposit Draw Condition'>
            <Form.Item label='DDC'>
              <InputNumber
                disabled
                style={{
                  width: '100%',
                }}
                readOnly
                value={data?.used_unused_percentage}
                prefix='%'
              />
            </Form.Item>
          </Popover>
        </Col>
      </Row>
      <Row className={classes.generalTableHeader}>
        <Col className={classes.generalTableTitle} span={4} />
        <Col className={classes.generalTableTitle} span={10}>
          {t('Winning Limit')}
        </Col>
        <Col className={classes.generalTableTitle} span={10}>
          {t('GGR Limit')}
        </Col>
      </Row>
      <Row>
        <Col className={classes.generalTableTitle} span={4}>
          {t('Casino')}
        </Col>
        <Col className={classes.generalTableBody} span={10}>
          {data?.casino_winning_limit}
        </Col>
        <Col className={classes.generalTableBody} span={10}>
          {data?.casino_ggr_limit}
        </Col>
      </Row>
      <Row>
        <Col className={classes.generalTableTitle} span={4}>
          {t('Games')}
        </Col>
        <Col className={classes.generalTableBody} span={10}>
          {data?.games_winning_limit}
        </Col>
        <Col className={classes.generalTableBody} span={10}>
          {data?.games_ggr_limit}
        </Col>
      </Row>
      <Row>
        <Col className={classes.generalTableTitle} span={4}>
          {t('Sport')}
        </Col>
        <Col className={classes.generalTableBody} span={10}>
          {data?.sport_winning_limit}
        </Col>
        <Col className={classes.generalTableBody} span={10}>
          {data?.sport_ggr_limit}
        </Col>
      </Row>
    </>
  );
};
export default GeneralLimitTab;
