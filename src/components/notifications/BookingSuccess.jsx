import React, {useContext} from 'react';
import {Button, notification, Space} from 'antd';
import {useNavigate} from 'react-router-dom';
import {AuthenticationContext} from '../../context/AuthenticationContext';

const close = () => {
    console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

const BookingsSuccess = () => {
    const [api, contextHolder] = notification.useNotification();
    const {isAuthenticated} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const openNotification = () => {
        const goBack = () => {
            api.destroy(key);
            navigate('/login');
        };

        const goToBookings = () => {
            api.destroy(key);
            navigate('/bookings');
        };
        // unique key for notification to avoid duplication of notifications
        const key = `open${Date.now()}`;
        const btn = (
                <Space>
                    <Button type="link" size="medium" onClick={() => goBack(key)}>
                        No, forget it
                    </Button>

                    <Button type="primary" size="medium" onClick={() => goToBookings(key)}>
                        Yes, show me my bookings
                    </Button>
                </Space>
            )
        ;
        api.open({
            message: 'Success!',
            description:
                'You have successfully booked your appointment. Where do you want to go now?',
            btn,
            key,
            onClose: close,
        });
    };
    return (
        <>
            {contextHolder}
            {isAuthenticated &&
                <Button type="primary" onClick={openNotification} style={{fontWeight: "bold"}}>
                    Booking
                </Button>
            }
        </>
    );
};

export default BookingsSuccess;