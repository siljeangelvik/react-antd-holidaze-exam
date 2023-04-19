import {useRef} from 'react';

export function LoginForm({onSubmit}) {

    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{maxWidth:"320px", display:"flex", flexDirection:"column", gap:"20px"}}>
            <label htmlFor="email">Email:</label>
            <input ref={emailRef} type="email" id="email" placeholder="Please enter your name" style={{padding:"9px", borderRadius:"7px", border:"2px solid lightgray"}}/>
            <label htmlFor="password">Password:</label>
            <input ref={passwordRef} type="password" id="password" placeholder="Example@mail.com" style={{padding:"9px", borderRadius:"7px", border:"2px solid lightgray"}}/>
            <button type="submit" style={{padding:"9px", background:"transparent", border:"2px solid lightgreen", borderRadius:"7px"}}>Login</button>
        </form>
    );
}