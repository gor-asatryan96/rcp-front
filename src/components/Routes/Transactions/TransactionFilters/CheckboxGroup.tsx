import { Checkbox, Col } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { FC } from 'react';

type Proptypes = {
  name: string;
  options: string[];
  value: CheckboxValueType[];
  onAllCheck: (name: string, values: CheckboxValueType[]) => void;
  onFilterChange: (name: string, values: CheckboxValueType[]) => void;
  span: number;
};

const CheckboxGroup: FC<Proptypes> = ({
  name,
  options,
  value,
  onAllCheck,
  onFilterChange,
  span,
}) => {
  const isAllCheck = options.length === value.length;

  return (
    <>
      <Col span={span} style={{ whiteSpace: 'nowrap' }}>
        {name}:
      </Col>
      <Checkbox
        checked={isAllCheck}
        onChange={() => onAllCheck(name, isAllCheck ? [] : options)}>
        ALL
      </Checkbox>
      <Col>
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
