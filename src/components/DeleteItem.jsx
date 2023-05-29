import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { API_BOOKINGS } from '../utilities/constants';

export function DeleteItem ({ change }) {
    const confirm = (e) => {
        console.log(e);
        if (e) {
            fetch(`${API_BOOKINGS}/${e}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
            message.success('Successfully deleted the venue');
        } else {
            message.error('Failed to delete the venue');
        }
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Clicked on No');
    };

    return (
        <Popconfirm
            title="Delete the venue"
            description="Are you sure you want to delete this venue?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button onClick={() => change()} danger>Delete</Button>
        </Popconfirm>
    );
}