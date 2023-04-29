import { Button, message, Space } from 'antd';

const SuccessRegistered = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const successRegister = () => {
        messageApi.open({
            type: 'success',
            content: 'Successfully registered a new account',
        });
    };
    return (
        <>
            {contextHolder}
            <Space>
                <Button onClick={successRegister}>Register</Button>
            </Space>
        </>
    );
};

export default SuccessRegistered;