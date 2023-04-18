import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';

export function NotFound() {
  return (
    <div>
        <Content style={{paddingBottom:"40px"}}>
            <Title level={1}>404</Title>
            <Title level={4}>Page not found</Title>
        </Content>
    </div>
  );
}