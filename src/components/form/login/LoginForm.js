import React, {useContext} from 'react';
import {useFormik} from 'formik';
import useApiPost from '../../../hooks/useApiPost';
import {API_LOGIN} from '../../../utilities/constants';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import {loginSchema} from './schema';
import '../styles.css';

const LoginForm = () => {

    const {handleUserLogin, userData} = useContext(AuthenticationContext);

    const {data, isLoading, isError, postData} = useApiPost(API_LOGIN); // Make sure this custom hook is implemented correctly

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const response = await postData(values);
                if (data) {
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('avatar', data.avatar);
                    localStorage.setItem('manager', data.manager);
                    handleUserLogin(userData);
                }
                return response;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="form">
            {formik.status && <p>{formik.status}</p>}
            {/* Display the API response error message */}
            {data && data.errors && data.errors[0].message && (<p className="form-error">* {data.errors[0].message}</p>)}
            {isLoading && (<p className="form-error">Loading...</p>)}
            {isError && (<p className="form-error">Error</p>)}
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

            <button className="primary-button" type="submit">Submit</button>
        </form>
    );
};

export default LoginForm;