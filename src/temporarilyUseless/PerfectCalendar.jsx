import {CalendarOutlined, UserOutlined} from '@ant-design/icons';
import {Option} from 'antd/es/mentions';
import Title from 'antd/es/typography/Title';
import React, {useContext, useState} from 'react';
import {Calendar, Col, Radio, Row, Select, theme, Typography} from 'antd';
import 'dayjs/locale/zh-cn';
import {Link} from 'react-router-dom';
import {AuthenticationContext} from '../context/AuthenticationContext';
import useApiPost from '../hooks/useApiPost';

import {VenuesContext} from '../context/VenuesContext';

const PerfectCalendar = () => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedGuests, setSelectedGuests] = useState(1);
    const {isAuthenticated} = useContext(AuthenticationContext);
    const {specificVenue, disabledDates} = useContext(VenuesContext);

    const handleDateClick = (date) => {
        if (selectedDates.length === 0) {
            setSelectedDates([date])
        } else if (selectedDates.length === 1) {
            if (date >= selectedDates[0]) {
                setSelectedDates([selectedDates[0], date])
            } else {
                setSelectedDates([date, selectedDates[0]])
            }
        } else {
            setSelectedDates([date]);
        }
    };

    const {token} = theme.useToken();

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
        if (selectedDates.length > 0) { // if there are selected dates, clear them
            const formattedDates = selectedDates.map((date) => date.format('YYYY-MM-DD'));
            console.log(formattedDates);
        }
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const booking = {
        dateFrom: selectedDates[0],
        dateTo: selectedDates[1],
        guests: selectedGuests,
        venueId: specificVenue?.id,
    };

    const {
        data,
        isLoading,
        isError,
        postData
    } = useApiPost("https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_venue=true");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await postData(booking);
            if (response) {
                console.log('Booking successful, Response:', response);
                console.log('Booking successful, Booking:', booking);
                return response;
            } else {
                console.log('Booking failed');
            }
        } catch (error) {
            console.error('Error posting booking:', error);
        }
        if (isLoading) {
            return console.log('Booking is loading');
        }
        if (isError) {
            return console.log('Booking failed', data.errors[0].message);
        }
    };

    return (
        <>
            <div style={wrapperStyle}>
                {isLoading && <div>Loading...</div>}
                {isError && <div>{data.errors[0].message}</div>}
                <form onSubmit={handleSubmit}>
                    <Calendar
                        fullscreen={false}
                        mode="date"
                        onSelect={handleDateClick}
                        onPanelChange={onPanelChange}
                        onChange={handleDateClick}
                        disabledDate={(currentDate) => {
                            // Use the disabledDates function from the VenuesContext to disable specific dates
                            return disabledDates(currentDate);
                        }}
                        headerRender={({value, type, onChange, onTypeChange}) => {
                            const start = 0;
                            const end = 12;
                            const monthOptions = [];
                            let current = value.clone();
                            const localeData = value.localeData();
                            const months = [];
                            for (let i = 0; i < 12; i++) {
                                current = current.month(i);
                                months.push(localeData.monthsShort(current));
                            }
                            for (let i = start; i < end; i++) {
                                monthOptions.push(
                                    <Select.Option key={i} value={i} className="month-item">
                                        {months[i]}
                                    </Select.Option>
                                );
                            }
                            const year = value.year();
                            const month = value.month();
                            const options = [];
                            for (let i = year - 10; i < year + 10; i += 1) {
                                options.push(
                                    <Select.Option key={i} value={i} className="year-item">
                                        {i}
                                    </Select.Option>
                                );
                            }
                            return (
                                <div
                                    style={{
                                        padding: 8,
                                    }}
                                >
                                    <Typography.Title level={4}>Dates available for booking</Typography.Title>
                                    <Row gutter={8}>
                                        <Col>
                                            <Radio.Group
                                                size="small"
                                                onChange={(e) => onTypeChange(e.target.value)}
                                                value={type}
                                            >
                                                <Radio.Button value="month">Month</Radio.Button>
                                                <Radio.Button value="year">Year</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                className="my-year-select"
                                                value={year}
                                                onChange={(newYear) => {
                                                    const now = value.clone().year(newYear);
                                                    onChange(now);
                                                }}
                                            >
                                                {options}
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                value={month}
                                                onChange={(newMonth) => {
                                                    const now = value.clone().month(newMonth);
                                                    onChange(now);
                                                }}
                                            >
                                                {monthOptions}
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        }}
                    />
                    <div>
                        {selectedDates && selectedDates.length >= 1 ? (
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <Title level={5}>Your selected dates</Title>
                                <Typography.Text type="secondary">
                                    <CalendarOutlined/>{" "}
                                    <Typography.Text type="secondary">
                                        {selectedDates[0].format("DD MMM YYYY")}
                                    </Typography.Text>{" "}
                                    <Typography.Text type="secondary">
                                        {selectedDates.length > 1 ? "to" : ""}
                                    </Typography.Text>{" "}
                                    <Typography.Text type="secondary">
                                        {selectedDates.length > 1
                                            ? selectedDates[selectedDates.length - 1].format(
                                                "DD MMM YYYY"
                                            )
                                            : ""}
                                        ( {selectedDates.length} {selectedDates.length > 1 ? "nights" : "night"} )
                                    </Typography.Text>
                                </Typography.Text>
                                <Typography.Text type="secondary">
                                    <CalendarOutlined/>{" "}
                                    <Typography.Text type="secondary">
                                        {selectedDates.length}
                                    </Typography.Text>{" "}
                                    <Typography.Text type="secondary">
                                        {selectedDates.length > 1 ? "nights" : "night"}
                                    </Typography.Text>
                                </Typography.Text>
                            </div>
                        ) : (<div><Title level={5}>Please select your dates</Title></div>)}
                        {selectedGuests && selectedGuests > 0 ? (
                            <div>
                                <Title level={5}>Your selected guests</Title>
                                <Typography.Text type="secondary">
                                    <UserOutlined/>{" "}
                                    <Typography.Text type="secondary">
                                        {selectedGuests}
                                    </Typography.Text>{" "}
                                    <Typography.Text type="secondary">
                                        {selectedGuests > 1 ? "guests" : "guest"}
                                    </Typography.Text>
                                </Typography.Text>
                            </div>) : (<div><Title level={5}>Please select your guests</Title></div>)}
                    </div>
                    {/* GUESTS - SELECT & DISPLAY */}
                    <div>
                        {selectedGuests <= 0 && <Typography.Text level={5} type="danger">Please select a valid number of guests</Typography.Text>}
                        {selectedGuests > specificVenue?.maxGuests && <Typography.Text level={5} type="danger">You have exceeded the maximum amount of guests allowed</Typography.Text>}
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <Title level={5}>Select your guests</Title>
                            <Select
                                defaultValue={0}
                                onChange={(value) => setSelectedGuests(value)}
                                style={{width: 120}}
                                value={selectedGuests}
                            >
                                {specificVenue &&
                                    [...Array(specificVenue?.maxGuests).keys()].map((guest) => (
                                        <Option key={guest} value={guest + 1}>
                                            {guest + 1}
                                        </Option>
                                    ))}
                            </Select>
                        </div>
                    </div>
                    {/* BUTTON - BOOK NOW */}
                    <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                        {isAuthenticated && selectedGuests && selectedDates.length >= 1 && selectedGuests <= specificVenue?.maxGuests
                            ? (<button type="submit" className="primary-button">Book Now</button>)
                            : (<button type="submit" className="primary-button" disabled>Please select your dates and guests</button>)}
                        {!isAuthenticated &&
                            <Link to="/login">
                                <Title level={5} type="danger">* You need to be logged in to book</Title>
                                <strong style={{textAlign: "center"}}>Log in to you account</strong>
                            </Link>
                        }
                    </div>
                </form>
            </div>
        </>
    );
};

export default PerfectCalendar;