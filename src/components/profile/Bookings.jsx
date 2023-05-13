import {Content} from 'antd/es/layout/layout';
import React, {useState} from 'react';
import {BookingsList} from '../../components/BookingsList';

export default function Bookings() {

    const [bookings, setBookings] = useState([]);

    return (
        <>
            <div style={{minHeight: '95vh', padding: '80px 40px'}}>
                <Content style={{paddingBottom: '20px'}}>

                    <BookingsList bookings={bookings}/>
                </Content>
            </div>
        </>
    );
}


/*
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "dateFrom": "2023-04-19T22:25:07.406Z",
    "dateTo": "2023-04-19T22:25:07.406Z",
    "guests": 0,
    "created": "2023-04-19T22:25:07.406Z",
    "updated": "2023-04-19T22:25:07.406Z",
    "venue": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "description": "string",
      "media": "string",
      "price": 0,
      "maxGuests": 1,
      "created": "2023-04-19T22:25:07.406Z",
      "updated": "2023-04-19T22:25:07.406Z",
      "meta": {
        "wifi": true,
        "parking": true,
        "breakfast": true,
        "pets": true
      },
      "owner": {
        "name": "string",
        "email": "string",
        "avatar": "string"
      }
    },
    "customer": {
      "name": "string",
      "email": "string",
      "avatar": "string"
    }
  }
]
 */