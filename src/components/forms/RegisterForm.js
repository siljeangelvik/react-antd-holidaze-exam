import {Typography} from 'antd';
import {useState} from 'react';
import useApiPost from '../../hooks/useApiPost';
import {API_REGISTER} from '../../utilities/constants';

export function RegisterForm() {
    // Call the useApiPost hook with the desired URL
    const {postData, isLoading, isError, data} = useApiPost(API_REGISTER);

    // Define state variables for the login form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(true);
    const [manager, setManager] = useState('');

    // Define an event handler for the form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call the postData function with the form data
        await postData({email, password});
        console.log("You successfully registered a new account");
        setTimeout(() => {
            window.location.replace(`/login`)
        }, 3000)
    };

    return (
        <>
            <form onSubmit={handleSubmit}
                  style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>

                <label htmlFor="name">Name:</label>

                <input value={name}
                       onChange={(e) => setName(e.target.value)}
                       type="text" id="name" placeholder="Please enter your name"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="email">Email:</label>
                <input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="text" id="email" placeholder="Example@mail.com"
                       pattern={"/^[a-z0-9_æøå]{4,25}@(stud.)?noroff.no$/i"}
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>


                <label htmlFor="password">Password:</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" id="password" placeholder="Enter your password"
                    style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="manager">Manager:</label>
                <div>
                    <input value={manager}
                           onChange={(e) => setManager(e.target.value)}
                           type="checkbox" id="manager" aria-checked={true}
                           style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                    <Typography.Text>Register as a Venue Manager?</Typography.Text>
                </div>

                <button type="submit" disabled={isLoading}
                        style={{
                            padding: "9px",
                            background: "transparent",
                            border: "2px solid transparent",
                            borderRadius: "7px",
                            backgroundColor: "#3dbd7d",
                            color: "white",
                            fontWeight: "bold",
                        }}
                >
                    Register
                </button>
                {isError && <div>Error submitting form</div>}
                {data && <div>{data.message}</div>}
            </form>
        </>

    );
}

/*
export function RegisterForm() {

    return (
        <>
            <form style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>

                <label htmlFor="name">Name:</label>

                <input type="text" id="name" placeholder="Please enter your name"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" placeholder="Example@mail.com"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="password">Password:</label>
                <input

                     type="password" id="password" placeholder="Enter your password"
                    style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="manager">Manager:</label>
                <div>
                    <input  type="checkbox"
                            id="manager"
                            aria-checked={true}
                           style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                    <Typography>Register as a Venue Manager?</Typography>
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
                        }}
                >
                    Register
                </button>
            </form>
        </>

    );
}
 */



/*
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
        <>
            <form onSubmit={handleSubmit}
                  style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>

                <label htmlFor="name">Name:</label>

                <input ref={nameRef} type="text" id="name" placeholder="Please enter your name"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="email">Email:</label>
                <input ref={emailRef} type="text" id="email" placeholder="Example@mail.com"
                       pattern={"/^[a-z0-9_æøå]{4,25}@(stud.)?noroff\.no$/i"}
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="password">Password:</label>
                <input

                    ref={passwordRef} type="password" id="password" placeholder="Enter your password"
                    style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="manager">Manager:</label>
                <div>
                    <input ref={managerRef} type="checkbox" id="manager" aria-checked={true}
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
                        }}
                >
                    Register
                </button>
            </form>
        </>

    );
}
*/



/*
export function RegisterForm() {

    return (
        <>
            <form style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>

                <label htmlFor="name">Name:</label>

                <input type="text" id="name" placeholder="Please enter your name"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" placeholder="Example@mail.com"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="password">Password:</label>
                <input

                     type="password" id="password" placeholder="Enter your password"
                    style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

                <label htmlFor="manager">Manager:</label>
                <div>
                    <input  type="checkbox"
                            id="manager"
                            aria-checked={true}
                           style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                    <Typography>Register as a Venue Manager?</Typography>
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
                        }}
                >
                    Register
                </button>
            </form>
        </>

    );
}
 */