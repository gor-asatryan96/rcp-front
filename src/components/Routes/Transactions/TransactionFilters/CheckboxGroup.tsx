import { Checkbox, Col } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { FC } from 'react';

type Proptypes = {
  name: string;
  options: string[];
  value: CheckboxValueType[];
  onAllCheck: (name: string, values: CheckboxValueType[]) => void;
  onFilterChange: (name: string, values: CheckboxValueType[]) => void;
};

const CheckboxGroup: FC<Proptypes> = ({
  name,
  options,
  value,
  onAllCheck,
  onFilterChange,
}) => {
  const isAllCheck = options.length === value.length;

  return (
    <>
      <Col span={3}>{name}:</Col>
      <Checkbox
        checked={isAllCheck}
        onChange={() => onAllCheck(name, isAllCheck ? [] : options)}>
        ALL
      </Checkbox>
      <Col span={20}>
        <Checkbox.Group
          value={value}
          options={options}
          onChange={values => onFilterChange(name, values)}
          style={{ flexWrap: 'wrap' }}
        />
      </Col>
    </>
  );
};

export default CheckboxGroup;
