import React from 'react';
import successLogin from '../alerts/SuccessLogin';

const Trigger = () => {
    const handleTrigger = () => {
        successLogin();
        console.log('triggered');
    };

    return (
        <button className="primary-button" onClick={handleTrigger}>
            Trigger Modal
        </button>
    );
};

export default Trigger;