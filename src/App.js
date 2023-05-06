import {CssBaseline} from '@mui/material';
import {ConfigProvider} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {Route, Routes} from 'react-router-dom';
import Venues from './pages/Venues';
import Navbar from './components/layout/navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/layout/Layout';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import Home from './pages/Home';
import {VenuesProvider} from './context/VenuesContext';
import "./main.css";

function App() {

    return (
        <>
            <ConfigProvider
                theme={{
                    palette: {
                        primary: {
                            main: '#4caf50',
                        },
                        secondary: {
                            main: '#ff99ff',
                        },
                        background: {
                            default: '#ffff99',
                        },
                    },
                    typography: {
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 16,
                        fontWeightLight: 300,
                        fontWeightRegular: 400,
                        fontWeightMedium: 500,
                        fontWeightBold: 700,
                    },

                    token: {
                        colorPrimary: '#ff9900',
                        colorFillSecondary: '#00bbf9',
                    },
                }}
            >
                <CssBaseline/>

                <Content className={"App"}>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index path="/" element={
                                <VenuesProvider>
                                    <Home/>
                                </VenuesProvider>
                            }
                            />
                            <Route path="/details/:id"
                                   element={
                                       <VenuesProvider>
                                           <Details/>
                                       </VenuesProvider>
                                   }
                            />

                            <Route path="/profile">
                                <Route path=":name" element={<Profile/>}>
                                    <Route path=":bookings" element={<Bookings/>}/>
                                    <Route path=":venues" element={<Venues/>}/>
                                </Route>
                            </Route>


                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/bookings" element={<Bookings/>}/>
                            <Route path="/venues" element={<Venues/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </Content>
            </ConfigProvider>
        </>
    );
}

export default App;