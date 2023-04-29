import {useRef, useState} from 'react';
import {Button, DatePicker, Radio, Space} from 'antd';

const {RangePicker} = DatePicker;

function Calendar({onBookNow}) {

    const dateFromRef = useRef();
    const dateToRef = useRef();

    function handleBooking(e) {
        e.preventDefault();
        const [dateFrom, dateTo] = dateFromRef.current.state.value;
        console.log(dateFrom, dateTo);
        onBookNow({dateFrom, dateTo});
    }

    const [size, setSize] = useState('middle');
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    return (
        <>
            <Space direction="vertical" size={12}>
                <Radio.Group value={size} onChange={handleSizeChange}>
                    <Radio.Button value="large">Large</Radio.Button>
                    <Radio.Button value="middle">middle</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>

                <RangePicker
                    ref={dateFromRef && dateToRef}
                    onChange={handleBooking}
                    size={size}
                />

                <Button type="primary" onClick={handleBooking}>Book</Button>
            </Space>
        </>
    );
}

export default Calendar;

/*
  <Content style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                <Button type="primary" onClick={() => setOpenCalendar(true)} style={{width: "300px"}}>Reserve</Button>
            </Content>

            {openCalendar &&
                <Content style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    <CalendarComponent venue={booking}/>
                    <Button type="primary" onClick={() => handleCalendar()} style={{width: "300px"}}>Book Now</Button>
                    <Button type="primary" onClick={() => setOpenCalendar(false)} style={{width: "300px"}}>Close
                        Calendar</Button>
                </Content>
            }
 */