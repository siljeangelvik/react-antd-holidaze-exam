import {Typography} from 'antd';
import {useRef} from 'react';

export function RegisterForm({onSubmit}) {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const managerRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            manager: managerRef.current.value,
        });
    }

    return (
        <form onSubmit={handleSubmit}
              style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop:"40px"}}>

            <label htmlFor="name">Name:</label>
            <input ref={nameRef} type="text" id="name" placeholder="Please enter your name"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <label htmlFor="email">Email:</label>
            <input ref={emailRef} type="email" id="email" placeholder="Example@mail.com"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <label htmlFor="password">Password:</label>
            <input ref={passwordRef} type="password" id="password" placeholder="Enter your password"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <label htmlFor="manager">Manager:</label>
            <div>
                <input ref={managerRef} type="checkbox" id="manager"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                <Typography.Text>Register as a Venue Manager?</Typography.Text>
            </div>

            <button type="submit"
                    style={{
                        padding: "9px",
                        background: "transparent",
                        border: "2px solid transparent",
                        borderRadius: "7px",
                        backgroundColor: "#3dbd7d",
                        color: "white",
                        fontWeight: "bold",
                    }}>Login
            </button>
        </form>
    );
}