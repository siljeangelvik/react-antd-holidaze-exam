import {useParams} from 'react-router-dom';
import Profile from '../../pages/Profile';
import useApiGet from '../../hooks/useApiGet';
import {API_PROFILE_URL} from '../../utilities/constants';

async function fetchProfileAccount() {

    const {name} = useParams();
    const {data: profileDetails} = useApiGet(API_PROFILE_URL + "/" + name);

    console.log(profileDetails);

    localStorage.getItem("accessToken");

    localStorage.setItem("id", profileDetails.id);
    localStorage.setItem("name", profileDetails.name);
    localStorage.setItem("email", profileDetails.email);
    localStorage.setItem("avatar", profileDetails.avatar);

    console.log(profileDetails["_count"]);
    console.log(profileDetails["id"]);
    console.log(profileDetails + "profileDetails");
}

fetchProfileAccount(API_PROFILE_URL, <Profile />)
    .then(r => console.log(r));