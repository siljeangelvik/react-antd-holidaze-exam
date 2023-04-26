import {Typography} from 'antd';
import {useState} from 'react';
import Login from './Login';
import useApiPost from '../hooks/useApiPost';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [manager, setManager] = useState(true);

    const {
        data,
        isLoading,
        isError,
        postData
    } = useApiPost('https://nf-api.onrender.com/api/v1/holidaze/auth/register');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleManagerChange(event) {
        setManager(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const payload = {name, email, password, manager};
        await postData(payload);
        console.log(payload);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong...</div>;
    }

    if (data && data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        console.log(data);
        // The register was successful, redirect the user to the login page
        setTimeout(() => {
            return <Login/>
        }, 3000);
    }

    return (
        <form onSubmit={handleSubmit}
              style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                   id="name"
                   placeholder="Please enter your name"
                   onChange={handleNameChange}
                   value={name}
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <label htmlFor="email">Email:</label>
            <input type="text"
                   id="email"
                   placeholder="Example@mail.com"
                   onChange={handleEmailChange}
                   value={email}
                   pattern={/^[A-Za-z0-9_æøå]{4,25}@(stud.)?noroff.no$/i}
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <label htmlFor="password">Password:</label>
            <input type="password"
                   id="password"
                   onChange={handlePasswordChange}
                   value={password}
                   placeholder="Enter your password"
                   style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>

            <label htmlFor="manager">Manager:</label>
            <div>
                <input type="checkbox"
                       id="manager"
                       onChange={handleManagerChange}
                       value={manager}
                       aria-checked={true}
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
                    }}>Register
            </button>
        </form>
    );
}

export default Register;

/*
function Register() {

    async function onSubmit(formData) {
        console.log(formData);

        try {
            const postData = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            };
            const response = await fetch(API_REGISTER_URL, postData);
            console.log(response);
            const json = await response.json();
            console.log(json);
            if (!response.ok) {
                throw new Error();
            }

            console.log(response.status);

            localStorage.setItem("accessToken", json.accessToken);

            setTimeout(() => {
                window.location.replace("/login");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div>
            <RegisterForm onSubmit={onSubmit}/>
        </div>
    );
}

//export default Register;

//             <RegisterForm onSubmit={onSubmit}/>

// RESPONSE

/*

{ id: 179,
  name: "SiAvAng",
  email: "siljeavenaangelvik@noroff.no",
  avatar: null,
  venueManager: false }

 */