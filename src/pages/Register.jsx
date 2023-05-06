import {Content} from 'antd/es/layout/layout';
import {RegisterForm} from '../components/forms/RegisterForm';

function Register(onSubmit) {
    return (
        <>
            <div style={{padding: "80px 40px", height: "95vh"}}>
                <Content style={{paddingBottom: "20px"}}>
                    <RegisterForm onSubmit={onSubmit}/>
                </Content>
            </div>
        </>
    );
}

export default Register;