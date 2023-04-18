import {Bookings} from '../../pages/Bookings';

export function Logout() {

    if (localStorage.getItem("token")) {
        console.log("You're logged in");

        localStorage.clear();
        localStorage.removeItem("token");

        console.log("removed token");

        window.location = <Bookings/>;
    } else {
        console.log("You're not logged in");
    }
}