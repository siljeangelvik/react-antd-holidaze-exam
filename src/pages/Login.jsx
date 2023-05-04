import {Content} from 'antd/es/layout/layout';
import {LoginForm} from '../components/forms/LoginForm';

function Login(onSubmit) {
    return (
        <>
            <div style={{padding: "80px 40px", height: "'100vh"}}>
                <Content style={{paddingBottom:"20px"}}>
                    <LoginForm onSubmit={onSubmit}/>
                </Content>
            </div>
        </>
    );
}

export default Login;