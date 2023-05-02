import {CssBaseline} from '@mui/material';
import {ConfigProvider} from 'antd';
import {Content} from 'antd/es/layout/layout';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import useAuthentication from './hooks/useAuthentication';
import {profileName} from './utilities/constants';
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

    const isLoggedIn = useAuthentication();

    if (isLoggedIn) {
        console.log(profileName);
        document.title = profileName;
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b',
                        colorFillSecondary: '#00bbf9',
                    },
                }}
            >
                <CssBaseline/>
                <Content className={"container"}>

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
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/bookings" element={<Bookings/>}/>
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