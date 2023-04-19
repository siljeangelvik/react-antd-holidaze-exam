import {UPDATE_PROFILE_AVATAR} from '../../utilities/constants';

export async function updateProfileAvatar(avatar) {
    try {
        const putAvatarData = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "content-Type": "application/json",
            },
            body: JSON.stringify({avatar}),
        };
        const response = await fetch(UPDATE_PROFILE_AVATAR, putAvatarData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        if (!response.ok) {
            throw new Error(json.message);
        }

        console.log(response.status);
        await localStorage.setItem("avatar", json.avatar)
        localStorage.getItem("avatar");
        return json.avatar;
    } catch (error) {
        console.log(error);
    }
}