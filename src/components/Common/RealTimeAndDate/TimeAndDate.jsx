import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const TimeAndDate = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('h:mm:ss A'));
  const [currentDate, setCurrentDate] = useState(
    dayjs().format('MMMM D, YYYY'),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('h:mm:ss A'));
      setCurrentDate(dayjs().format('DD.MM.YYYY'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {currentDate} {currentTime}
    </div>
  );
};

export default TimeAndDate;
