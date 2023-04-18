import {Button} from 'antd';
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
                    <Content style={{paddingBottom: "40px"}}>
                        <Title level={1}>Login</Title>
                        <Title level={4}>Welcome to the login page. Please enter your credentials to continue.</Title>
                    </Content>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p><label htmlFor="name">Name: </label></p>
                        <input {...register('name')} />
                        <p className={'error'}>{errors.name?.message}</p>

                        <p><label htmlFor="password">Password: </label></p>
                        <input {...register('password')} />
                        <p className={'error'}>{errors.password?.message}</p>

                        <Button type="submit">Login</Button>
                    </form>
                </div>
            )}
        </>
    );
}

export default LoginForm;