import {Table} from 'antd';
import React from 'react';

export function ItemBookings({ bookings }) {

    bookings = bookings.map(booking => {
        const {id, dateFrom, dateTo, guests, created, updated} = booking;
        return {
            key: id,
            id,
            dateFrom,
            dateTo,
            guests,
            created,
            updated
        }
    });

    return (
           <Table
                dataSource={bookings}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id'
                    },
                    {
                        title: 'Date From',
                        dataIndex: 'dateFrom',
                        key: 'dateFrom'
                    },
                    {
                        title: 'Date To',
                        dataIndex: 'dateTo',
                        key: 'dateTo'
                    },
                    {
                        title: 'Guests',
                        dataIndex: 'guests',
                        key: 'guests'
                    },
                    {
                        title: 'Created',
                        dataIndex: 'created',
                        key: 'created'
                    },
                    {
                        title: 'Updated',
                        dataIndex: 'updated',
                        key: 'updated'
                    }
                ]}
              />
    )
}