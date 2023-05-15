import React, {useContext} from 'react';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import useApiPost from '../../../hooks/useApiPost';
import {API_REGISTER} from '../../../utilities/constants';
import {registrationSchema} from './schema'; // Import the registrationSchema from schema.js
import '../styles.css';

const RegistrationForm = () => {
    const {handleUserRegister} = useContext(AuthenticationContext);
    const {data, isLoading, isError, postData} = useApiPost(API_REGISTER); // Make sure this custom hook is implemented correctly
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            venueManager: true,
        },
        validationSchema: registrationSchema, // Use the imported registrationSchema

        onSubmit: async (values) => {
            try {
                const response = await postData(values);
                console.log(response);
                if (data.success) {
                    navigate('/login');
                    handleUserRegister(data);
                }
                return response;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
    });

    const showVenueManagerOption = formik.values.email.endsWith('stud.noroff.no');

    return (
        <form onSubmit={formik.handleSubmit} className="form">
            {formik.status && <p>{formik.status}</p>}
            {/* Display the API response error message */}
            {data && data.errors && data.errors[0].message && (
                <p className="form-error">* {data.errors[0].message}</p>)}
            {isLoading && (<p className="form-error">Loading...</p>)}
            {isError && (<p className="form-error">Error</p>)}
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="form-error">* {formik.errors.name}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="form-error">* {formik.errors.email}</div>
                ) : null}
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
            {showVenueManagerOption && (
                <div>
                    <label htmlFor="venueManager">Venue Manager</label>
                    <div className="manager-container">
                        <input
                            className="checkmark"
                            id="venueManager"
                            name="venueManager"
                            type="checkbox"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.venueManager}
                        />
                        <p>
                            {formik.values.venueManager
                                ? 'Yes, I want to register as manager'
                                : 'No, I don\'t want to register as manager'}
                        </p>
                    </div>
                    {formik.touched.venueManager && formik.errors.venueManager ? (
                        <div className="form-error">* {formik.errors.venueManager}</div>
                    ) : null}
                </div>
            )}
            <button className="primary-button" type="submit">Submit</button>
        </form>
    );
};

export default RegistrationForm;