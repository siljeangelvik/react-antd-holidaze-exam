import {Key} from 'react';
import React, {useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Input, Space} from 'antd';


interface VenueItem {
    name: string;
    // add any other properties here
}

const suffix = (
    <SearchOutlined
        style={{
            fontSize: 16,
            color: '#242424',
            backgroundColor: 'transparent',
            border: 'none',
        }}
    />
);


const venues: VenueItem[] = [
    {name: 'The Old Vic'},
    {name: 'The Old Vic'},
    {name: 'The Old Vic'},
    ];

const Searchbar: React.FC = () => {
    const [searchInput, setSearchInput] = useState('');

    const onSearch = (value: string) =>
        venues.filter((venue) =>
            venue.name.toLowerCase().includes(value.toLowerCase())
        );

    return (
        <Space direction="vertical">
            <Input
                type="text"
                value={searchInput}
                list="dataList"
                onChange={(e) => setSearchInput(e.target.value)}
                addonBefore={suffix}
                placeholder="What are you looking for?"
                allowClear
                style={{
                    marginBottom: '2rem',
                    width: '300px',
                    padding: '0.35rem',
                    backgroundColor: 'transparent',
                    borderRadius: '0.25rem',
                    border: '2px solid #ccc',
                }}
            />

            <datalist id="dataList">
                {onSearch(searchInput).map((venue, index: Key) => (
                    <option key={index} value={venue.name} />
                ))}
            </datalist>

            {onSearch(searchInput).map((venue, index: Key) => (
                <div key={index}>{venue.name}</div>
            ))}
        </Space>
    );
};

export default Searchbar;
