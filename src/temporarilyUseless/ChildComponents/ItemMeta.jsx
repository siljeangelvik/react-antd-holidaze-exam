import React from 'react';

export function ItemMeta(meta: { wifi: boolean, parking: boolean, breakfast: boolean, pets: boolean }) {
    const wifi = meta.wifi ? 'Yes' : 'No';
    const parking = meta.parking ? 'Yes' : 'No';
    const breakfast = meta.breakfast ? 'Yes' : 'No';
    const pets = meta.pets ? 'Yes' : 'No';

    return (
        <>
            <p><strong>WiFi:</strong> {wifi}</p>
            <p><strong>Parking:</strong> {parking}</p>
            <p><strong>Breakfast:</strong> {breakfast}</p>
            <p><strong>Pets:</strong> {pets}</p>
        </>
    )
}