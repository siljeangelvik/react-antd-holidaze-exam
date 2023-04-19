import {Button} from 'antd';
import {Content} from 'antd/es/layout/layout';
import React, {useState} from 'react';
import CalendarFC from './CalendarFC';

const CalendarComponent = () => {

/*  const {id, dateFrom, dateTo, guests, created, updated} = booking
    console.log(booking);
    console.log(id, dateFrom, dateTo, guests, created, updated);
    const dateFormat = formatDate()
    console.log(dateFormat(dateFrom));  */

    const [toggle, setToggle] = useState(false);


    return (
        <div>
            <Content style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                {toggle &&
                    <>
                        <CalendarFC  />
                    </>}
                <Button onClick={() => setToggle(!toggle)} style={{maxWidth:"300px"}} type="primary">{toggle ?  "Cancel" : "Reserve"}</Button>
            </Content>
        </div>
    );
};

export default CalendarComponent;


/*

  "bookings": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dateFrom": "2023-04-19T01:36:11.758Z",
      "dateTo": "2023-04-19T01:36:11.758Z",
      "guests": 0,
      "created": "2023-04-19T01:36:11.758Z",
      "updated": "2023-04-19T01:36:11.758Z"
    }
  ]


 */