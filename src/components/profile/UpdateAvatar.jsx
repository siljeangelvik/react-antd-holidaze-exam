import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Image, Upload } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useRef } from 'react';
import useApiPut from '../../hooks/useApiPut';
import { profileName, UPDATE_PROFILE_AVATAR } from '../../utilities/constants';

const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const UpdateAvatar = ({ putAvatar }) => {
    const avatarRef = useRef(null);
    const profileAvatar = localStorage.getItem('avatar');

    const { isLoading, putData } = useApiPut(UPDATE_PROFILE_AVATAR, putAvatar);

    const handlePutAvatar = (e) => {
        e.preventDefault();
        putData({
            avatar: avatarRef.current.value,
        });
        localStorage.setItem('avatar', avatarRef.current.value);
    }

    const uploadButton = (
        <div>
            {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Content>
            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                style={{ borderRadius: "50%" }}
                beforeUpload={() => false}
                customRequest={() => {
                    localStorage.getItem("avatar")
                }}
            >
                {profileAvatar ? (
                    <Image
                        itemType={"avatar"}
                        height={100}
                        width={100}
                        src={localStorage.getItem("avatar") === null ? defaultAvatar : localStorage.getItem("avatar")}
                        alt={profileName}
                        style={{ borderRadius: "50%" }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>

            <input
                ref={avatarRef}
                placeholder="Enter Valid Image Link"
                type="text"
                pattern="^https?:\/\/.*\.(?:png|jpg|jpeg)$"
                style={{
                    padding: "9px",
                    borderRadius: "7px",
                    border: "1px solid lightgray",
                    display: "block",
                    width: "300px"
                }}
            />

            <Button
                onClick={handlePutAvatar}
                type={"primary"}
                style={{
                    borderRadius: "7px",
                    border: "1px",
                    display: "block",
                    width: "315px",
                    marginTop: "10px",
                }}
            >
                Update Avatar
            </Button>
        </Content>
    );
};

export default UpdateAvatar;