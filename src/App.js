import {ConfigProvider} from 'antd';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {profileName} from './utilities/constants';
import Form from './components/forms';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import Home from './pages/Home';
import Layout from "./components/layout/Layout";
import {VenuesProvider} from './context/VenuesContext';
import "./main.css";

const App: React.FC = () => (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#00b96b',
                colorFillSecondary: '#00bbf9',
            },
        }}
    >
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index
                       element={
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
                {}
                <Route path={`/profile/` + profileName} element={<Profile/>} />
                <Route path="/bookings" element={<Bookings/>}/>
                <Route path="/login" element={<Form/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>

    </ConfigProvider>
);

export default App;
