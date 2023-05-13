/*import {Button, Card} from '@mui/material';
import {Form} from 'antd';
import React, {useRef, useState} from "react";
import useAuthentication from '../../../hooks/useAuthentication';
import useApiPost from '../../../hooks/useApiPost';
import {API_LOGIN} from '../../../utilities/constants';

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {isLoggedIn} = useAuthentication();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {postData} = useApiPost(API_LOGIN);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await postData(emailRef.current.value, passwordRef.current.value);
        } catch { setError('Failed to create an account') }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {isLoggedIn && isLoggedIn.email}
                    {loading && <div className="alert alert-info">Loading...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>

                        <Button type="submit" className="w-100 mt-4">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Signup;*/