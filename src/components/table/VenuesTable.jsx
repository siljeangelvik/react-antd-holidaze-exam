import { Space, Table, Tag } from 'antd';
import {useContext, useEffect, useState} from 'react';
import {VenuesContext} from '../../context/VenuesContext';
import {AuthenticationContext} from '../../context/AuthenticationContext';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <button>{text}</button>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button>Edit {record.name}</button>
                <button>Delete</button>
            </Space>
        ),
    },
];

/* const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
]; */

const VenuesTable = () => {
    const [venues, setVenues] = useState([]);
    const {userVenues} = useContext(VenuesContext);
    const { userProfile } = useContext(AuthenticationContext);

    useEffect(() => {
        if (userProfile?.venues?.length > 0) {
            setVenues(userProfile?.venues);
        }
    }, [userProfile, venues, userVenues]);

    const data = [
        {
            key: venues?.id,
            name: venues?.name,
            price: venues?.price,
            address: venues?.location?.address,
            tags: ['cool', 'teacher'],
        },
    ]
    return (
        <Table columns={columns} dataSource={data} />
    );
};

export default VenuesTable;