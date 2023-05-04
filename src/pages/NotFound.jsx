import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';

function NotFound() {
  return (
    <div>
        <Content style={{paddingBottom:"40px"}}>
            <Title level={1}>404</Title>
            <Title level={4}>Oooops, sorry...Page not found!</Title>
        </Content>
    </div>
  );
}

export default NotFound;