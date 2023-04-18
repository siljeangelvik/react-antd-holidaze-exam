import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import LoginForm from "../login/LoginForm";
import {API_REGISTER_URL} from '../../../utilities/constants';
import {schema} from './schema';
import React, {useState} from 'react';
import {Button, Checkbox, Input, Typography} from 'antd';
import useApiPost from '../../../hooks/useApiPost';

function Register() {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState('');

    const {postData, isLoading, isError} = useApiPost(API_REGISTER_URL);


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
                <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth:"320px", display:"flex", flexDirection:"column"}}>

                    <Typography.Title level={5}>Name: </Typography.Title>
                    <Input {...register("name")} errors={errors.name} warnings={errors.name}/>
                    <Typography.Text type="danger">{errors.name?.message}</Typography.Text>

                    <Typography.Title level={5}>Email: </Typography.Title>
                    <Input {...register("email")} errors={errors.email?.message} warnings={errors.email?.message}/>
                    <Typography.Text type="danger">{errors.email?.message}</Typography.Text>

                    <Typography.Title level={5}>Password: </Typography.Title>
                    <Input {...register("password")} errors={errors.password?.message} warnings={errors.password?.message}/>
                    <Typography.Text type="danger">{errors.password?.message}</Typography.Text>

                    <Typography.Title level={5}>Confirm Password: </Typography.Title>
                    <Input {...register("confirmPassword")} errors={errors.confirmPassword?.message} warnings={errors.confirmPassword?.message}/>
                    <Typography.Text type="danger">{errors.confirmPassword?.message}</Typography.Text>

                    <Typography.Title level={5}>Manager: </Typography.Title>
                    <Typography>
                        <Checkbox {...register("manager")} errors={errors.manager?.message} warnings={errors.manager?.message}/> Register as a Venue Manager?</Typography>
                    <Typography.Text type="danger">{errors.manager?.message}</Typography.Text>

                    {isLoading && <p>Loading...</p>} {/* display loading message */}
                    {isError && (
                        <p className={'error'}>Error: something went wrong</p>
                    )} {/* display error message */}
                    {errorMessage && (
                        <p className={'error'}>{errorMessage}</p>
                    )} {/* display error message */}

                    <Button type="primary" htmlType="submit" style={{marginTop:"20px"}}>Register</Button>
                </form>
            </div>
        </>
    );
}

export default Register;