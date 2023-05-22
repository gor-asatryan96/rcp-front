import { Checkbox } from 'antd';
import { FC } from 'react';

type Proptypes = {
  options: string[];
  value: string[];
};

const CheckboxGroup: FC<Proptypes> = ({ options, value }) => {
  // const [indeterminate, setIndeterminate] = useState(true);

  return (
    <Checkbox.Group
      value={value}
      options={options}
      style={{ flexWrap: 'wrap' }}
    />
  );
};

export default CheckboxGroup;
