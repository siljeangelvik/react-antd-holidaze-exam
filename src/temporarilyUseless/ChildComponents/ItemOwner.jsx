import {UserOutlined} from '@ant-design/icons';
import {Space} from 'antd';
import Avatar from 'antd/es/avatar/avatar';

export function ItemOwner(owner: { name: string, email: string, avatar: string} = {name: "N/A", email: "N/A", avatar: ""}) {

  return (
      <div style={{display: "flex", gap: "10px"}}>
          <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                  {owner.avatar
                      ? <Avatar size={64} icon={<img src={owner.avatar} alt={owner.name}/>} />
                      : <Avatar size={64} icon={<UserOutlined/>} />}
              </Space>
          </Space>


          <div style={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "baseline"}}>
              <span><strong>Host: </strong>{owner.name ? owner.name : "N/A"}</span>
              <span><strong>Contact: </strong>{owner.email ? owner.email : "N/A"}</span>
          </div>
      </div>
  );
}