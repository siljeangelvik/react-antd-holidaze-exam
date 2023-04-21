import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {API_LOGIN_URL, profileToken} from '../utilities/constants';
import {LoginForm} from '../components/forms/LoginForm';

function Login() {

    const navigate = useNavigate();

    async function onSubmit(formData) {
        console.log(formData);

        try {
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${profileToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            };
            const response = await fetch(API_LOGIN_URL, options);
            console.log(`response = ${response}`);
            const json = await response.json();
            console.log(json);
            if (!response.ok) {
                console.log(json.errors[0].message);
                throw new Error();
            }
            console.log(response.status);

            alert("You are now logged in!");



            localStorage.setItem("accessToken", json.accessToken);
            localStorage.setItem("name", json.name);
            localStorage.setItem("email", json.email);
            localStorage.setItem("manager", json.manager);
            localStorage.setItem("avatar", json.avatar);



        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <LoginForm onSubmit={onSubmit} />
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


/*

        localStorage.setItem("accessToken", json.accessToken);
            localStorage.setItem("name", json.name);
            localStorage.setItem("email", json.email);
            localStorage.setItem("manager", json.manager);
            localStorage.setItem("avatar", json.avatar);

 */