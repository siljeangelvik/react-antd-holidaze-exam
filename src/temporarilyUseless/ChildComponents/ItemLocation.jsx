import React from 'react';

export function ItemLocation({location}) {

    return (
        <div>
            <p><strong>Address:</strong> {location.address}</p>
            <p><strong>Address:</strong> {location.address}</p>
            <p><strong>City:</strong> {location.city}</p>
            <p><strong>Zip:</strong> {location.zip}</p>
            <p><strong>Country:</strong> {location.country}</p>
            <p><strong>Continent:</strong> {location.continent}</p>
            <p><strong>Latitude:</strong> {location.lat}</p>
            <p><strong>Longitude:</strong> {location.lng}</p>
        </div>
    )
}


