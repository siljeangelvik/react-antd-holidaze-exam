import {Button, Input} from '@mui/material';
import {Form} from 'antd';
import {useContext} from 'react';
import {AuthContext} from '../../../context/AuthContext';

function Register() {
    const { handleRegister } = useContext(AuthContext);
    const handleRegisterFormSubmit = (event) => {
        event.preventDefault();
        const userData = { username: event.target.username.value, password: event.target.password.value };
        handleRegister(userData);
    };

    return (
        <Form onSubmit={handleRegisterFormSubmit} style={{display:"flex", flexDirection:"column"}}>
            Name:
            <Input type={"text"} name={"name"}/>
            Email:
            <Input type={"email"} name={"email"}/>
            Password:
            <Input type={"password"} name={"password"}/>
            Register as a venue manager?
            <Input type={"checkbox"} name={"manager"}/>
            <Button type={"submit"}>Login</Button>
        </Form>
    );
}