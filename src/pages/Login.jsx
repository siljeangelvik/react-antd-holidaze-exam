import {Button} from '@mui/material';
import React, {useState} from 'react';
import {RegisterForm} from '../components/forms/RegisterForm';
import {LoginForm} from '../components/forms/LoginForm';

function Login() {

    const [toggle, setToggle] = useState(false);

    return (
        <div>
            {toggle
                ? <LoginForm/>
                : <RegisterForm/>
            }

            <Button onClick={() => setToggle(!toggle)}>
                {toggle ? "Dont have an account? Sign up here" : "Already have an account? Log in here"}
            </Button>
        </div>
    );
}

export default Login;

// RESPONSE:
/*
Object {
name: "SiAvAng",
email: "siljeavenaangelvik@noroff.no",
avatar: null, venueManager: false,
accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc5LCJuYW1lIjoiU2lBdkFuZyIsImVtYWlsIjoic2lsamVhdmVuYWFuZ2VsdmlrQG5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwidmVudWVNYW5hZ2VyIjpmYWxzZSwiaWF0IjoxNjgxODc3MTQzfQ.hlATxgtLFcQLxMrD-TiOyQPptqrg6PkHV8_IQMpEhHs" }
*/