import React, { useMemo } from 'react';
import {RadiusUpleftOutlined,} from '@ant-design/icons';
import { Button, notification, Space } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

const Context = React.createContext({ name: `default` });

const LoginSuccess: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `Notification ${placement}`,
            description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
            placement,
        });
    };

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <Space>
                <Button type="primary" onClick={() => openNotification('topLeft')}>
                    <RadiusUpleftOutlined />
                    topLeft
                </Button>
            </Space>
        </Context.Provider>
    );
};

export default LoginSuccess;