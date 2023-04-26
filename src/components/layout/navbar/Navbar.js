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
import * as React from 'react';
import {Link} from 'react-router-dom';
import HandleLogout from '../../../utilities/HandleLogout';
import useAuth from '../../../hooks/useAuth';

export default function Navbar() {

    const isLoggedIn = useAuth(true);

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <nav className={"nav"}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <HeatMapOutlined sx={{display: {xs: 'none', md: 'flex'}, mr: 4, pr: 4, ml: 2}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 4,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HOLIDAZE
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/"} className={"site-venues"}
                                          style={{
                                              listStyleType: "none",
                                              textDecoration: "none",
                                              fontWeight: "bold",
                                              color: "black"
                                          }}
                                    >
                                        Home
                                    </Link>
                                </MenuItem>

                                {!isLoggedIn &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to={"/login"} className={"site-login"}
                                              style={{
                                                  listStyleType: "none",
                                                  textDecoration: "none",
                                                  fontWeight: "bold",
                                                  color: "black"
                                              }}
                                        >
                                            Login
                                        </Link>
                                    </MenuItem>
                                }

                                {isLoggedIn &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to={"/bookings"} className={"site-bookings"}
                                              style={{
                                                  listStyleType: "none",
                                                  textDecoration: "none",
                                                  fontWeight: "bold",
                                                  color: "black"
                                              }}
                                        >
                                            Your Bookings
                                        </Link>
                                    </MenuItem>
                                }

                                {isLoggedIn &&
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Link to={"/profile"} className={"site-profile"}
                                              style={{
                                                  listStyleType: "none",
                                                  textDecoration: "none",
                                                  fontWeight: "bold",
                                                  color: "black"
                                              }}
                                        >
                                            Your Profile</Link>
                                    </MenuItem>
                                }
                            </Menu>
                        </Box>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to={"/"} className={"site-venues"} style={{
                                    listStyleType: "none",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    color: "white"
                                }}
                                >
                                    Home
                                </Link>
                            </MenuItem>

                            {!isLoggedIn &&
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/login"} className={"site-login"}
                                          style={{
                                              listStyleType: "none",
                                              textDecoration: "none",
                                              fontWeight: "bold",
                                              color: "white"
                                          }}
                                    >
                                        Login
                                    </Link>
                                </MenuItem>
                            }

                            {isLoggedIn &&
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/bookings"} className={"site-bookings"}
                                          style={{
                                              listStyleType: "none",
                                              textDecoration: "none",
                                              fontWeight: "bold",
                                              color: "white"
                                          }}
                                    >
                                        Your Bookings
                                    </Link>
                                </MenuItem>
                            }

                            {isLoggedIn &&
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={`/profile`} className={"site-profile"}
                                          style={{
                                              listStyleType: "none",
                                              textDecoration: "none",
                                              fontWeight: "bold",
                                              color: "white"
                                          }}
                                    >
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

/*
function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);

    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return (
        <li className={isActive ? "active" : ""} style={{textAlign:"center"}}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}
 */