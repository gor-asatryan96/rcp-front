import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

type PropTypes = {
  children: ReactNode;
};

const AlertProvider: FC<PropTypes> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default AlertProvider;
