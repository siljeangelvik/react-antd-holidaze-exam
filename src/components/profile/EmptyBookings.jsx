import { Button, Empty } from 'antd';

const EmptyBookings = () => (
    <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
            height: 60,
        }}
        description={
            <span>
        Customize <a href="#">Description</a>
      </span>
        }
    >
        <Button type="primary">Create Now</Button>
    </Empty>
);

export default EmptyBookings;