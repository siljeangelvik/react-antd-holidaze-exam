import {Button, message, Space} from 'antd';

const SuccessLogin = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const successLogin = () => {
        messageApi.open({
            type: 'success',
            content: 'Successfully logged in',
        });
    };

    return (
        <>
            {contextHolder}
            <Space>
                <Button onClick={successLogin}>Login</Button>
            </Space>
        </>
    );
};

export default SuccessLogin;