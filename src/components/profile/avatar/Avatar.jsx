import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Upload, message} from 'antd';
import {useState} from 'react';
import {API_PROFILES} from '../../../utilities/constants';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = ({type, size}) => {
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const Avatar = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = ({file}) => {
        setLoading(file.status === 'uploading');
        if (file.status === 'done') {
            // Get this url from response in real world.
            getBase64(file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                const formData = new FormData();
                formData.append('avatar', file.originFileObj);

                fetch(`${API_PROFILES}/${localStorage.getItem("name")}/media`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update avatar');
                        }
                        message.success('Avatar updated successfully').then(r => localStorage.setItem('avatar', r));
                        localStorage.setItem('avatar', imageUrl);
                    })
                    .catch(error => {
                        console.error(error);
                        message.error(error.message).then(r => console.log(r));
                    });
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action={profileAvatar}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default Avatar;