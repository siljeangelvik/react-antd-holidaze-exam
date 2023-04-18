import {ConfigProvider} from 'antd';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Bookings} from './pages/Bookings';
import {Profile} from './pages/Profile';
import {NotFound} from './pages/NotFound';
import {Login} from './pages/Login';
import Details from './pages/Details';
import Home from './pages/Home';
import Layout from "./components/layout/Layout";

const App: React.FC = () => (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#00b96b',
                colorFillSecondary: '#0000ff',
            },
        }}
    >
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/details/:id" element={<Details />}/>
                <Route path="/bookings" element={<Bookings />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    </ConfigProvider>
);

export default App;
