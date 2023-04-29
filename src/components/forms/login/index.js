import { Button, Input } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLoginRegisterData} from '../../../hooks/useLocalStorage';
import { API_LOGIN_URL } from '../../../utilities/constants';
import useApiPost from '../../../hooks/useApiPost';

function LoginForm() {
    const navigate = useNavigate();

    const {handleLogin} = useLoginRegisterData();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { postData, isLoading, isError } = useApiPost(API_LOGIN_URL, {});


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postData({ email, password });

            /*
             {
    "username" : name,
    "password" : password
}
             */


            console.log(response.data);
            console.log(response);
            if (response && response.data) {
                handleLogin(response.data);
                alert('Logged in successfully!');
                navigate('/profile');
            } else {
                throw new Error("Response or response data is undefined");
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while logging in. Please try again.');
        } finally {
           console.log(isLoading);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', maxWidth: '320px' }}
        >
            Email:
            <Input
                type={'email'}
                value={email}
                onChange={() => setEmail(email)}
            />
            Password:
            <Input
                type={'password'}
                value={password}
                onChange={() => setPassword(password)}
            />
            <Button type={'submit'} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            {isError && <p>{isError.message}</p>}
        </form>
    );
}

export default LoginForm;