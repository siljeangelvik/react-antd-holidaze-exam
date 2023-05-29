import React, {useContext, useState} from 'react';
import {VenuesContext} from '../../context/VenuesContext';

export const Guests = () => {
    const {specificVenue} = useContext(VenuesContext);
    const [count, setCount] = useState(1);

    const handleDecrement = () => {
        if (count < 1) {
            setCount(1);
        }
        setCount(- 1);
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    return (
        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
            <button
                className={"primary-button increase-decrease-buttons"}
                type="button"
                onClick={handleDecrement}>-</button>
            <input
                type="number"
               value={count}
               max={specificVenue?.maxGuests}
               min={0} style={{width: "60px", textAlign: "center"}}>{count}</input>
            <button
                className={"primary-button increase-decrease-buttons"}
                type="button"
                onClick={handleIncrement}>+</button>
        </div>
    );
};