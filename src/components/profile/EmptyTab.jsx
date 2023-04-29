import { Button, Empty } from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';

const EmptyTab = () => (
    <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
            height: 60,
        }}
        description={
            <span>
        Book your next <Link to="/">adventure</Link> now!
      </span>
        }
    >
        <Button type="primary">Venues</Button>
    </Empty>
);

export default EmptyTab;