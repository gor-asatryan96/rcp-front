import { CheckCircleTwoTone } from '@ant-design/icons';
import classNames from 'classnames';
import { FC } from 'react';

import classes from './TFASuccess.module.scss';

type PropTypes = {
  isSuccess: boolean;
};

const TFASuccess: FC<PropTypes> = ({ isSuccess }) => {
  return (
    <div
      className={classNames(classes.successIconWrapper, {
        [classes.success]: isSuccess,
      })}>
      <CheckCircleTwoTone
        twoToneColor='#52c41a'
        className={classes.successIcon}
      />
    </div>
  );
};

export default TFASuccess;
