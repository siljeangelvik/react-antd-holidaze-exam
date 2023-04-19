import LoginSuccess from '../components/alerts/LoginSuccess';
import {API_LOGIN_URL} from '../utilities/constants';
import {LoginForm} from '../components/forms/LoginForm';

function Login() {

    async function onSubmit(formData) {
        console.log(formData);

        try {
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "content-Type": "application/json",
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
            localStorage.setItem("accessToken", json.accessToken);
            localStorage.setItem("name", json.name);
            localStorage.setItem("email", json.email);
            localStorage.setItem("manager", json.manager);
            localStorage.setItem("avatar", json.avatar);

            alert("You are now logged in!")

            setTimeout(() => {
                return (
                    <LoginSuccess />
                );
            }, 1000)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <LoginForm onSubmit={onSubmit}/>
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