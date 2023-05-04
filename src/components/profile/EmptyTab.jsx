import {Button, Empty, Typography} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';

const EmptyTab = () => (
    <Empty
        style={{margin: "40px"}}
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
            height: 60,
        }}
        description={
            <span>
                <Typography.Text>
                    Book your <strong>first adventure</strong> by <Link to="/">exploring</Link> beautiful places worldwide!
                </Typography.Text>
            </span>
        }
    >
        <Button style={{marginTop: "20px"}} type="primary">Venues</Button>
    </Empty>
);

export default EmptyTab;