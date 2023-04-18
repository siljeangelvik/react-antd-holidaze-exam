import {Button, Input, Typography} from 'antd';
import FormItemInput from 'antd/es/form/FormItemInput';
import FormItemLabel from 'antd/es/form/FormItemLabel';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import useApiPost from '../../../hooks/useApiPost';
import LoginSuccess from '../../alerts/LoginSuccess';
import {API_LOGIN_URL} from '../../../utilities/constants';
import {schema} from './schema';
import Register from '../register/RegisterForm';

function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [showRegister, setShowRegister] = useState(false);

    const apiPost = useApiPost(API_LOGIN_URL, localStorage.getItem('token'));

    const [user, setUser] = useState({
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        avatar: localStorage.getItem("avatar"),
        manager: localStorage.getItem("manager")
    });



    async function onSubmit(data) {



        try {

            const response = await apiPost(API_LOGIN_URL, data); // send the data to the API
            const json = await response.json(); // get the JSON response

            console.log(json); // log the JSON response to the console

            if (response.ok) { // if the response is OK
                console.log('Login success');


                localStorage.setItem('token', json.token); // save the token to local storage
                setUser({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    manager: user.manager
                }); // save the user to local storage

                setTimeout(() => { // redirect to the home page after 1 second
                    window.location = '/';
                }, 1000);
                alert(<LoginSuccess/>); // show the success alert
            } else if (response.status === 404) { // if the user does not exist
                console.log('User does not exist');
                setShowRegister(true); // show the register form
            } else { // if the response is not OK
                console.log(`Login failed: ${response.statusText}`);
            }
        } catch (error) { // if there is an error
            console.log(`Login failed: ${error.message}`);
        }
    }

    return (
        <>
            {showRegister ? (
                <Register setShowRegister={setShowRegister}/>
            ) : (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth:"320px", display:"flex", flexDirection:"column"}}>

                        <Typography.Title level={5}>Name: </Typography.Title>
                        <Input {...register("name")} errors={errors.name?.message} warnings={errors.name?.message}/>
                        <Typography.Text type="danger">{errors.name?.message}</Typography.Text>

                        <Typography.Title level={5}>Password: </Typography.Title>
                        <Input {...register("password")} errors={errors.password?.message} warnings={errors.password?.message}/>
                        <Typography.Text type="danger">{errors.password?.message}</Typography.Text>

                        <Button type="primary" htmlType="submit" style={{marginTop:"20px"}}>Login</Button>
                    </form>
                </div>
            )}
        </>
    );
}

export default LoginForm;