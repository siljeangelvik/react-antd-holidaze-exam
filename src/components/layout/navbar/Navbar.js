import {HeatMapOutlined} from '@ant-design/icons';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import useAuthentication from '../../../hooks/useAuthentication';
import HandleLogout from 'src/utilities/HandleLogout';

export default function Navbar() {

    const isLoggedIn = useAuthentication();

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <nav className={"nav"}>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to={"/"} style={{color:"white", marginRight:"15px"}}>
                            <HeatMapOutlined sx={{display: {xs: 'none', md: 'flex'}, mr: 4, pr: 4, ml: 2}}/>
                        </Link>
                        <Link to={"/"}>
                            <Typography variant="h6" noWrap component="a" sx={{mr: 4, display: {xs: 'none', md: 'flex'}, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'white', textDecoration: 'none'}}>
                                HOLIDAZE
                            </Typography>
                        </Link>

                        {/* MOBILE MENU */}
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
                                        aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                                <MenuIcon/>
                            </IconButton>

                            <Menu id="menu-appbar" anchorEl={anchorElNav}
                                  anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} keepMounted
                                  transformOrigin={{vertical: 'top', horizontal: 'left',}}
                                  open={Boolean(anchorElNav)}
                                  onClose={handleCloseNavMenu}
                                  sx={{display: {xs: 'block', md: 'none'}}}>

                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/"} className={"site-venues"} style={{
                                        listStyleType: "none",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                        color: "black"
                                    }}>
                                        Home
                                    </Link>
                                </MenuItem>

                                {!isLoggedIn &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to={"/login"} className={"site-login"} style={{
                                            listStyleType: "none",
                                            textDecoration: "none",
                                            fontWeight: "bold",
                                            color: "black"
                                        }}>
                                            Login
                                        </Link>
                                    </MenuItem>
                                }

                                {!isLoggedIn &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to={"/register"} className={"site-login"} style={{
                                            listStyleType: "none",
                                            textDecoration: "none",
                                            fontWeight: "bold",
                                            color: "black"
                                        }}>
                                            Register
                                        </Link>
                                    </MenuItem>
                                }

                                {isLoggedIn &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to={"/profile"} className={"site-profile"} style={{
                                            listStyleType: "none",
                                            textDecoration: "none",
                                            fontWeight: "bold",
                                            color: "black"
                                        }}>
                                            Your Profile
                                        </Link>
                                    </MenuItem>
                                }

                                {isLoggedIn &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to={"/bookings"} className={"site-bookings"} style={{
                                            listStyleType: "none",
                                            textDecoration: "none",
                                            fontWeight: "bold",
                                            color: "black"
                                        }}>
                                            Your Bookings</Link>
                                    </MenuItem>
                                }

                                {isLoggedIn &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to={"/login"} className={"site-profile"} style={{
                                            listStyleType: "none",
                                            textDecoration: "none",
                                            fontWeight: "bold",
                                            color: "black"
                                        }}>
                                            <HandleLogout/>
                                        </Link>
                                    </MenuItem>
                                }
                            </Menu>
                        </Box>

                        {/* DESKTOP MENU */}
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to={"/"} className={"site-venues"} style={{
                                    listStyleType: "none",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    color: "white"
                                }}>
                                    Home
                                </Link>
                            </MenuItem>

                            {!isLoggedIn &&
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/login"} className={"site-login"} style={{
                                        listStyleType: "none",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                        color: "white"
                                    }}>
                                        Login
                                    </Link>
                                </MenuItem>
                            }

                            {!isLoggedIn &&
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/register"} className={"site-login"} style={{
                                        listStyleType: "none",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                        color: "white"
                                    }}>
                                        Register
                                    </Link>
                                </MenuItem>
                            }

                            {isLoggedIn &&
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/bookings"} className={"site-bookings"} style={{
                                        listStyleType: "none",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                        color: "white"
                                    }}>
                                        Your Bookings
                                    </Link>
                                </MenuItem>
                            }

                            {isLoggedIn &&
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={`/profile`} className={"site-profile"} style={{
                                        listStyleType: "none",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                        color: "white"
                                    }}>
                                        Your Profile
                                    </Link>
                                </MenuItem>
                            }

                            {isLoggedIn &&
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <HandleLogout/>
                                </MenuItem>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </nav>
    );
}