import React, {useContext, useEffect} from 'react';
import {useFormik} from 'formik';
import useApiPost from '../../../hooks/useApiPost';
import {API_LOGIN} from '../../../utilities/constants';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import {loginSchema} from './schema';
import {Input} from 'antd';
import '../styles.css';

const LoginForm = () => {
    const {handleUserLogin, userData} = useContext(AuthenticationContext);
    const {data, isLoading, isError, postData} = useApiPost(API_LOGIN);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (userFormData) => {
            try {
                const data = await postData(userFormData);
                if (data) {
                    return handleUserLogin(data, userFormData);
                }

                return userFormData;
            } catch (error) {
                console.log(error);
            }

        },
    });

    useEffect(() => {
        if (userData && data && data.token) {
            handleUserLogin(data, formik.values);
        }
    }, [userData, data, handleUserLogin, formik.values]);

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            {formik.status && <p>{formik.status}</p>}
            {isLoading && <p className="form-error">Loading...</p>}
            {isError && (<p className="form-error">* Error: <span className="form-error">{data?.errors?.[0]?.message}</span></p>)}
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
                <Input.Password
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    visibilityToggle
                    rootClassName="input-password-login"
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="form-error">* {formik.errors.password}</div>
                ) : null}
            </div>
            <button className="primary-button" type="submit">Login</button>
        </form>
    );
};

export default LoginForm;