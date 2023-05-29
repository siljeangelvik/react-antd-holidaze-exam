import {Rating} from '@mui/material';
import React from 'react';

export function ItemRating({ rating }) {

    return (
        <>
            <Rating name="read-only" value={rating} readOnly />
        </>
    )
}