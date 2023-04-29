import {useState} from 'react';
import {API_LOGIN} from '../../utilities/constants';
import useApiPost from '../../hooks/useApiPost';

export function LoginForm() {
    // Call the useApiPost hook with the desired URL
    const {postData, isLoading, isError, data} = useApiPost(API_LOGIN);

    // Define state variables for the login form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Define an event handler for the form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call the postData function with the form data
        await postData({email, password});
        console.log("You successfully logged in");

        setTimeout(() => {
            window.location.replace(`/profile`)
        }, 1500)
    };

    return (
        <form onSubmit={handleSubmit} id={"loginForm"}
              style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>
            <label htmlFor="email">Email:</label>
            <input value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   type="email"
                   id="email"
                   placeholder="Please enter your name"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
            <label htmlFor="password">Password:</label>
            <input value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   type="password"
                   id="password"
                   placeholder="Example@mail.com"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <button type="submit" disabled={isLoading}
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
            {isError && <div>Error submitting form</div>}
            {data && <div>{data.message}</div>}

        </form>
    );
}

/*
import {useRef} from 'react';

export function LoginForm({onSubmit}) {

    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });

        if (emailRef && passwordRef) {
            localStorage.getItem("accessToken");
            localStorage.setItem("name");
            localStorage.setItem("email");
            localStorage.setItem("avatar");
            localStorage.setItem("manager");
            window.location.replace(`/profile`);
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
*/