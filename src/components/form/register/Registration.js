import React, {useContext} from 'react';
import {useFormik} from 'formik';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import useApiPost from '../../../hooks/useApiPost';
import {API_REGISTER} from '../../../utilities/constants';
import {registrationSchema} from './schema';
import '../styles.css';

const RegistrationForm = () => {
    const { handleUserRegister } = useContext(AuthenticationContext);
    const { data, isLoading, isError, postData } = useApiPost(API_REGISTER);

    const handleCheckboxChange = (event) => {
        const newValue = event.target.checked;
        formik.setFieldValue('venueManager', newValue);
        console.log(newValue);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            venueManager: false,
        },
        validationSchema: registrationSchema, // Use the imported registrationSchema
        onSubmit: async (userFormData) => {
            try {
                const response = await postData(userFormData);
                if (response) {
                    console.log('Registration successful', response);
                    return handleUserRegister(response, userFormData);
                }
                return userFormData;
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="form">
            {formik.status && <p>{formik.status}</p>}
            {isLoading && <p className="form-error">Loading...</p>}
            {isError && (<p className="form-error">Error: {data?.errors?.[0]?.message}</p>)}
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
                {formik.touched.name && formik.errors.name ? (<div className="form-error">* {formik.errors.name}</div>) : null}
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
                {formik.touched.email && formik.errors.email ? (<div className="form-error">* {formik.errors.email}</div>) : null}
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
                {formik.touched.password && formik.errors.password ? (<div className="form-error">* {formik.errors.password}</div>) : null}
            </div>
            <div>
                <label htmlFor="venueManager">Venue Manager</label>
                <div className="manager-container">
                    <input
                        className="checkmark"
                        id="venueManager"
                        name="venueManager"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.venueManager}
                    />
                    <p>
                        {formik.values.venueManager
                            ? 'Yes, I want to register as manager'
                            : 'No, I don\'t want to register as manager'}
                    </p>
                </div>
                {formik.touched.venueManager && formik.errors.venueManager ? (<div className="form-error">* {formik.errors.venueManager}</div>) : null}
            </div>
            <button className="primary-button" type="submit">Sign up</button>
        </form>
    );
};

export default RegistrationForm;