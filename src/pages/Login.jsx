import {Content} from 'antd/es/layout/layout';
import {useNavigate} from 'react-router-dom';
import {API_LOGIN} from '../utilities/constants';
import {LoginForm} from '../components/forms/LoginForm';

function Login() {

    const navigate = useNavigate();

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
            const response = await fetch(API_LOGIN, postData);
            console.log(response);
            const json = await response.json();
            console.log(json);

            localStorage.setItem("accessToken", json.accessToken);

            if (!response.ok) {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
        }
        navigate("/profile");
    }

    return (
        <Content style={{padding: "40px"}}>
            <LoginForm onSubmit={onSubmit}/>
        </Content>
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