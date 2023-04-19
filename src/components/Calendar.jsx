import React from 'react';
import {DatePicker, Space} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


const Calendar = ({venue}) => {

    const {bookings: id } = venue;
    console.log(id);

    dayjs.extend(customParseFormat);

    const {RangePicker} = DatePicker;

    const dateFormat = 'YYYY/MM/DD';

    const CalendarUI: React.FC = () => (
        <Space direction="vertical" size={12}>
            <RangePicker
                defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
                format={dateFormat}
            />
        </Space>
    );

    return (
        <div>
            <CalendarUI/>
        </div>
    );
};

export default Calendar;
