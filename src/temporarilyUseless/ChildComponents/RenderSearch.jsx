import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import useApiGet from '../../hooks/useApiGet';

const renderTitle = (name) => (
    <span>
    {name}
        <a
            style={{
                float: 'right',
            }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
        >
      more
    </a>
  </span>
);

const renderItem = (name, count) => ({
    value: name,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {name}
            <span>
        <UserOutlined /> {count}
      </span>
        </div>
    ),
});

const RenderSearch = () => {
    const [options, setOptions] = useState([]);

    // Fetch data from API
    const { data, isLoading, isError } = useApiGet('https://example.com/api/data');

    useEffect(() => {
        if (!isLoading && !isError) {
            // Transform data into options format
            const transformedOptions = data.map((category) => ({
                label: renderTitle(category.label),
                options: category.options.map((option) => renderItem(option.name, option.count)),
            }));

            setOptions(transformedOptions);
        }
    }, [data, isLoading, isError]);

    return (
        <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            style={{
                width: 250,
            }}
            options={options}
        >
            <Input.Search size="large" placeholder="input here" />
        </AutoComplete>
    );
};

export default RenderSearch;
