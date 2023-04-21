import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {profileName, profileToken} from '../../utilities/constants';

export function LoginForm({onSubmit}) {

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [authenticated, setAuthenticated] = useState(profileToken || false);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });

        if (emailRef && passwordRef) {
            setAuthenticated(true)
            localStorage.setItem("accessToken", true);
            navigate(`/profile/${profileName}`);
        }
    }

    return (
        <form onSubmit={handleSubmit} id={"loginForm"}
              style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop:"40px"}}>
            <label htmlFor="email">Email:</label>
            <input ref={emailRef} type="email" id="email" placeholder="Please enter your name"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
            <label htmlFor="password">Password:</label>
            <input ref={passwordRef} type="password" id="password" placeholder="Example@mail.com"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <button type="submit"
                    style={{
                padding: "9px",
                background: "transparent",
                border: "2px solid transparent",
                borderRadius: "7px",
                backgroundColor:"#3dbd7d",
                color:"white",
                fontWeight:"bold",
            }}>Login
            </button>
        </form>
    );
}