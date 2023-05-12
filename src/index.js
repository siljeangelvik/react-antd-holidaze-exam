import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {AuthenticationProvider} from './context/AuthenticationContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthenticationProvider>
                <App/>
            </AuthenticationProvider>
        </BrowserRouter>
    </React.StrictMode>
);