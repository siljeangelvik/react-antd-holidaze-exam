import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import {Button, Result} from 'antd';
import {Link} from 'react-router-dom';

function NotFound() {

    return (
        <>
            <div style={{padding: "80px 40px", height: "95vh"}}>
                <Content style={{paddingBottom: "40px"}}>
                    <Title level={1}>404</Title>
                    <Title level={4}>Oops, sorry...Page not found!</Title>
                </Content>

                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary"><Link to={`/`}>Back Home</Link></Button>}
                />
            </div>
        </>
    );
}

export default NotFound;