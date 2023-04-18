import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginForm from "../login/LoginForm";
import { API_REGISTER_URL } from '../../../utilities/constants';
import { schema } from './schema';
import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import useApiPost from '../../../hooks/useApiPost';
const { Content } = Layout;
const { Title } = Typography;

function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState('');

    const { postData, isLoading, isError } = useApiPost(API_REGISTER_URL);


    async function onSubmit(data) {
        console.log(data);


        try {
            // do not make the fetch call here, it will be handled by the useApiPost hook

            await postData(data, localStorage.getItem("token"));

            if (!data.manager) {
                delete data.manager;
            }

            console.log(data);

            alert('Registration successful! Redirecting to login page...');
            return (<LoginForm/>);

        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <>
            <div>
                <Content style={{ paddingBottom: '40px' }}>
                    <Title level={1}>Register</Title>
                    <Title level={4}>
                        Please fill out the form below to register your account.
                    </Title>
                </Content>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>
                        <label htmlFor="name">Name: </label>
                    </p>
                    <input {...register('name')} />
                    <p className={'error'}>{errors.name?.message}</p>

                    <p>
                        <label htmlFor="email">Email: </label>
                    </p>
                    <input {...register('email')} />
                    <p className={'error'}>{errors.email?.message}</p>

                    <p>
                        <input type="checkbox" {...register('manager')} />
                        <label htmlFor="manager">Register as a Venue Manager</label>
                    </p>

                    <p>
                        <label htmlFor="password">Password: </label>
                    </p>
                    <input {...register('password')} />
                    <p className={'error'}>{errors.password?.message}</p>

                    <p className={'error'}>{errors.message?.message}</p>

                    {isLoading && <p>Loading...</p>} {/* display loading message */}
                    {isError && (
                        <p className={'error'}>Error: something went wrong</p>
                    )} {/* display error message */}
                    {errorMessage && (
                        <p className={'error'}>{errorMessage}</p>
                    )} {/* display error message */}
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
}

export default Register;