import {Avatar} from '@mui/material';
import React, {useContext, useState} from 'react';
import {AuthenticationContext} from '../../../context/AuthenticationContext';
import useApiPut from '../../../hooks/useApiPut';
import {API_PROFILES} from '../../../utilities/constants';
import "./styles.css";

export function UpdateAvatar() {
    const [toggle, setToggle] = useState(false);
    const [avatar, setAvatar] = useState('');
    const {userProfile} = useContext(AuthenticationContext);
    const {putData, isLoading, isError, data} = useApiPut(`${API_PROFILES}/${localStorage.getItem("name")}/media`);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const isValidAvatarUrl = (url) => {
        const regex = /\.(jpg|jpeg|png|gif|bmp)$/i;
        return regex.test(url);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidAvatarUrl(avatar)) {
            return alert('Please enter a valid image URL');
        }

        await putData({avatar});
        if (isError) {
            return alert('Error trying to update avatar');
        }
        setAvatar(avatar);
        localStorage.setItem('avatar', avatar);
        userProfile.avatar = avatar;
    };

    const handleRemoveAvatar = (event) => {
        event.preventDefault();
        putData({avatar: ""}).catch((error) => {
            console.log(error);
        });
        setAvatar("");
        localStorage.setItem('avatar', "");
        userProfile.avatar = "";
    }

    return (
        <>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px"
            }}>
                <Avatar src={userProfile?.avatar} className={"avatar-image"}/>
                <button className={"button-tertiary"} onClick={handleToggle}>Edit avatar</button>
            </div>
            {toggle &&
                <form style={{
                    maxWidth: "320px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}>
                    <input value={avatar} onChange={(e) => setAvatar(e.target.value)} type="text" name="avatar" id="avatar" placeholder="Please enter a valid image url" className="avatar-input"/>

                    <div style={{display: "flex", flexDirection:"row", flexWrap: "wrap", justifyItems:"space-between", gap: "10px"}}>
                        <button className="primary-button" type="submit" disabled={isLoading} onClick={handleSubmit} style={{maxWidth:"55%"}}>
                            Update Avatar
                        </button>
                        <button className="secondary-button" onClick={handleRemoveAvatar}>Remove Avatar</button>
                    </div>
                    {isError && <div>Error submitting form</div>}
                    {data && <div>{data.message}</div>}
                </form>
            }
        </>
    );
}