import Login from '../pages/Login';
import {RegisterSuccess} from '../components/alerts/RegisterSuccess';
import {RegisterForm} from '../components/forms/RegisterForm';
import {API_REGISTER_URL} from '../utilities/constants';

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

            return (
                <>
                    <RegisterSuccess/>
                    { setTimeout(() => {
                        return (
                            <Login/>
                        );
                    }, 2000)}
                </>
            );
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

export default Register;


// RESPONSE

/*

{ id: 179,
  name: "SiAvAng",
  email: "siljeavenaangelvik@noroff.no",
  avatar: null,
  venueManager: false }

 */