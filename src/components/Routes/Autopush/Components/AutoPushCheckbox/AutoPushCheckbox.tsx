import { FC } from 'react';
import { Checkbox, Col, Form, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

type Proptypes = {
  name: string;
  options: string[];
  value: CheckboxValueType[];
  onAllCheck: (name: string, values: CheckboxValueType[]) => void;
  onFilterChange: (name: string, values: CheckboxValueType[]) => void;
};

const AutoPushCheckbox: FC<Proptypes> = ({
  name,
  options,
  value,
  onAllCheck,
  onFilterChange,
}) => {
  const isAllCheck = options.length === value.length;

  return (
    <>
      <Form.Item name={name} label={name}>
        <Row>
          <Col offset={0}>
            <Checkbox
              checked={isAllCheck}
              onChange={() => onAllCheck(name, isAllCheck ? [] : options)}>
              ALL
            </Checkbox>
            <Checkbox.Group
              value={value}
              options={options}
              onChange={values => onFilterChange(name, values)}
              style={{ flexWrap: 'wrap' }}
            />
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default AutoPushCheckbox;
