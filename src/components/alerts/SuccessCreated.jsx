import {Button, message, Space} from 'antd';

const SuccessCreated = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const successCreated = () => {
        messageApi.open({
            type: 'success',
            content: 'Successfully created a venue',
        });
    };
    return (
        <>
            {contextHolder}
        </>
    );
};

export default SuccessCreated;