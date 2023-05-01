import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Upload, message} from 'antd';
import {useState} from 'react';
import {API_PROFILES, profileAccessToken, profileName} from '../../utilities/constants';

/**
 * Takes and image file and a callback function as input.
 * It reads the file using a FileReader object and calls the
 * callback function with the result (a base64-encoded string)
 * when the file has been loaded.
 * @param img
 * @param callback
 */
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

/**
 * This function takes an image file as input and checks
 * whether it is a JPG or PNG file (if not, it shows an error message) and
 * whether it is smaller than 2MB (if not, it shows another error message).
 * It returns a boolean indicating whether the file meets the requirements.
 * @param file
 * @returns {boolean}
 */
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const Avatar = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                const formData = new FormData();
                formData.append('avatar', info.file.originFileObj);

                fetch(`${API_PROFILES}/${profileName}/media`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${profileAccessToken}`,
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update avatar');
                        }
                        message.success('Avatar updated successfully');
                        localStorage.setItem('avatar', imageUrl);
                    })
                    .catch(error => {
                        console.error(error);
                        message.error(error.message);
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
        <>
            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
        </>
    );
};
export default Avatar;