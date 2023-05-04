import {RegisterForm} from '../components/forms/RegisterForm';

function Register(onSubmit) {
    return (
        <>
            <div style={{padding: "80px 40px", height: "'100vh"}}>
                <Content style={{paddingBottom: "20px"}}>
                    <RegisterForm onSubmit={onSubmit}/>
                </Content>
            </div>
        </>
    );
}

export default Register;