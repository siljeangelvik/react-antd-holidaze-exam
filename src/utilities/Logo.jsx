export const LogoSVG = './media/logo/logo_white_100.svg';

const Logo = () => {
    return (
        <img
            className="navbar-logo"
            src={LogoSVG}
            alt='Logo'
            aria-label='Logo'
            width={40}
            height='auto'
        />
    );
};

export default Logo;