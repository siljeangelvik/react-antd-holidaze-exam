import {Content} from 'antd/es/layout/layout';
import {LoginForm} from '../components/forms/LoginForm';

function Login(onSubmit) {
    return (
        <Content style={{padding: "40px"}}>
            <LoginForm onSubmit={onSubmit} />
        </Content>
    );
}

export default Login;