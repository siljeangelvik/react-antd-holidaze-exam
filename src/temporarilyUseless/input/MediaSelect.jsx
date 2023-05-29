import { Radio, Select, Space } from 'antd';
import { useState } from 'react';
const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}
const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};
const MediaSelect = () => {
    const [urlList, setUrlList] = useState([]);
    const [size, setSize] = useState('middle');
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleChange = (info) => {
        let newFileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2);

        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        setFileList(newFileList);
    };

    return (
        <>
            <Radio.Group value={size} onChange={handleSizeChange}>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="middle">Default</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}
            >
                <Select
                    size={size}
                    defaultValue="a1"
                    onChange={handleChange}
                    style={{
                        width: 200,
                    }}
                    options={options}
                />
                <Select
                    mode="multiple"
                    size={size}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                    }}
                    options={options}
                />
                <Select
                    mode="tags"
                    size={size}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                    }}
                    options={options}
                />
            </Space>
        </>
    );
};
export default MediaSelect;