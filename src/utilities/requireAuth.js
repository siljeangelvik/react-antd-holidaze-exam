export default function requireAuth(nextState, replace, next) {

const authenticated = localStorage.getItem('accessToken');

    if (!authenticated) {
        replace({
            pathname: "/", // redirect to login page
            state: {nextPathname: nextState.location.pathname}  // save the current path to redirect to after login
        });
    }
    next();
}