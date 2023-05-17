import { FC } from 'react';
import { Badge, Collapse } from 'antd';

import { INotification } from 'services/notification';

import classes from './Notification.module.scss';

interface IProps {
  not: INotification;
  onCollaps: (isOpen: boolean, not: INotification) => void;
}

const Notification: FC<IProps> = ({ not, onCollaps }) => {
  return (
    <Collapse
      key={not.id}
      onChange={list => onCollaps(!!list.length, not)}
      className={classes.collapse}
      size='large'>
      <Collapse.Panel
        extra={not.seen === 0 ? <Badge dot /> : null}
        key={not.id}
        header={not.sender}
        forceRender>
        <p>{not.body}</p>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Notification;
