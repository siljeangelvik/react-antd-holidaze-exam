import {Alert} from 'antd';

export const RegisterSuccess = () => {

  return (
      <Alert
          message="Successfully registered!"
          description="Now you can login to your new account."
          type="success"
          showIcon
      />
  );
};