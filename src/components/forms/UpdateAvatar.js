import {Avatar} from '@mui/material';
import React, {useContext, useState} from 'react';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import useApiPut from '../../hooks/useApiPut';
import {API_PROFILES} from '../../utilities/constants';

export function UpdateAvatar() {
    const {userProfileData} = useContext(AuthenticationContext);
    const {putData, isLoading, isError, data} = useApiPut(`${API_PROFILES}/${localStorage.getItem("name")}/media`);
    const [avatar, setAvatar] = useState('');

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
        setAvatar(avatar)
        localStorage.setItem('avatar', avatar);
        console.log('You have successfully updated your avatar!');
    };

    return (
        <>
            <Avatar src={userProfileData?.avatar} style={{width: "100px", height: "100px", margin: "auto"}}/>
            <form onSubmit={handleSubmit} style={{
                maxWidth: "320px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "40px"
            }}>
                <input value={avatar} onChange={(e) => setAvatar(e.target.value)} type="text" name="avatar"
                       id="avatar" placeholder="Please enter a valid image url"
                       style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                <button type="submit" disabled={isLoading} style={{
                    padding: "9px",
                    background: "transparent",
                    border: "2px solid transparent",
                    borderRadius: "7px",
                    backgroundColor: "#3dbd7d",
                    color: "white",
                    fontWeight: "bold",
                }}>
                    Update Avatar
                </button>
                {isError && <div>Error submitting form</div>}
                {data && <div>{data.message}</div>}
            </form>
        </>
    );
}