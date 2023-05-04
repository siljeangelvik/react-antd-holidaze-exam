import {RegisterForm} from '../components/forms/RegisterForm';

function Register(onSubmit) {
    return (
        <div>
            <RegisterForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Register;