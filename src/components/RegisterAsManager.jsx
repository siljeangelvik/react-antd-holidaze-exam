import React from 'react';

const RegisterAsManager = ({ email }) => {
    const canRegisterAsManager = email && email.endsWith('stud.noroff.no');

    return (
        <div>
            {canRegisterAsManager ? (
                <p>You can register as a Venue manager.</p>
            ) : (
                <p>You are not eligible to register as a Venue manager.</p>
            )}
        </div>
    );
};

export default RegisterAsManager;
