/*import {Typography} from 'antd';
import React, {useContext, useState} from 'react';
import useApiPost from '../../../hooks/useApiPost';
import {API_BOOKINGS} from '../../../utilities/constants';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import '../styles.css';

const LoginForm = ({bookingData}) => {

    const [selectedDates, setSelectedDates] = useState([]);
    const [startDate, endDate] = selectedDates;


    const {userData} = useContext(AuthenticationContext);
    const {data, isLoading, isError, postData} = useApiPost(); // Make sure this custom hook is implemented correctly

    const {dateFrom, dateTo, guests, venueId} = bookingData;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await postData(API_BOOKINGS, {
                dateFrom,
                dateTo,
                guests,
                userId: userData.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            console.log(response);
            if (data) {
                return data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            {data && data.errors && data.errors[0].message && (<p className="form-error">* {data.errors[0].message}</p>)}
            {isLoading && (<p className="form-error">Loading...</p>)}
            {isError && (<p className="form-error">Error</p>)}
            {selectedDates.length === 0 && (
                <Typography.Text type="danger">
                    Please select a date range
                </Typography.Text>
            )}
            {selectedDates.length === 1 && (
                <Typography.Text type="secondary">
                    Please select an end date
                </Typography.Text>
            )}
            {selectedDates.length === 2 && (
                <Typography.Text type="secondary">
                    {selectedDates[0].toDateString()} - {" "}
                    {selectedDates[1].toDateString()}
                </Typography.Text>
            )}
            <div>
                <label htmlFor="startDate">{startDate}</label>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="form-error">* {formik.errors.password}</div>
                ) : null}
            </div>
            <button className="primary-button" type="submit">Submit</button>
        </form>
    );
};

export default LoginForm;/*