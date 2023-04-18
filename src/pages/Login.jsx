import { Button } from 'antd';
import { useState } from 'react';
import RegisterForm from '../components/forms/register/RegisterForm';
import LoginForm from '../components/forms/login/LoginForm';

export function Login() {
    const [toggle, setToggle] = useState(false);

    return (
        <div>

            {toggle ? <RegisterForm /> : <LoginForm />}

            <Button onClick={() => setToggle(!toggle)}>
                {toggle ? 'Go to Login Form' : 'Go to Register Form'}
            </Button>
        </div>
    );
}