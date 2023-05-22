import React, {useContext} from 'react';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import useManagerStatus from '../../../hooks/useManagerStatus';
import useApiPost from '../../../hooks/useApiPost';
import {API_LOGIN} from '../../../utilities/constants';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import {loginSchema} from './schema';
import '../styles.css';

const LoginForm = () => {
    const {handleUserLogin} = useContext(AuthenticationContext);
    const {data, isLoading, isError, postData} = useApiPost(API_LOGIN); // this will post the form data to the api and return the user data

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            try {
                const response = postData(values);
                if (isLoading) return <p>Loading...</p>
                if (isError) return <p>Error</p>
                if (response) {
                    handleUserLogin(response && response.data);
                }
                //return data;
            } catch (error) {
                console.log(error);
            }
        },

    });

    return (
        <form onSubmit={formik.handleSubmit} className="form">
            {data && data.message && <p>{data.message}</p>}
            {formik.status && <p>{formik.status}</p>}
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
            <button className="primary-button" type="submit">Sign In</button>
        </form>
    );
};

export default LoginForm;