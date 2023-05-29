import React, {useContext} from 'react';
import {Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {InlineEdit} from './ChildComponents/InlineEdit';

export function Item({
                         id,
                         name,
                         description,
                         media,
                         price,
                         maxGuests,
                         rating,
                         created,
                         updated,
                         meta,
                         location,
                         owner,
                         bookings,
                         showDeleteButton,
                         showEditButton,
                         onDelete,
                         onEdit,
                         onCancelEdit,
                         onSaveEdit,
                         editingItemId,
                     }) {


    const isEditing = editingItemId === id;
    const {isAuthenticated} = useContext(AuthenticationContext);

    const handleSaveEdit = () => {
        // Create an updated item object with the edited values
        const updatedItem = {
               id,
                name,
                description,
                media,
                price,
                maxGuests,
                rating,
                created,
                updated,
                meta,
                location,
                owner,
                bookings,
        };

        // Pass the updated item to the onSaveEdit callback
        onSaveEdit(updatedItem);
    };

    return (
        <Content>
            {isEditing ? (
                // Render the editing form
                <form>
                    <InlineEdit label="Name" value={name} setValue={name}/>
                    <InlineEdit label="Description" value={description} setValue={description}/>
                    <InlineEdit label="Media" value={media} setValue={media}/>
                    <InlineEdit label="Price" value={price} setValue={price}/>
                    <InlineEdit label="Max Guests" value={maxGuests} setValue={maxGuests}/>
                    <InlineEdit label="Rating" value={rating} setValue={rating}/>
                    <InlineEdit label="Created" value={created} setValue={created}/>
                    <InlineEdit label="Updated" value={updated} setValue={updated}/>

                    <InlineEdit label="Meta" value={meta} setValue={meta}/>

                    {/*
                     <InlineEdit label="Wifi" value={meta.wifi} setValue={meta.wifi}/>
                    <InlineEdit label="Parking" value={meta.parking} setValue={meta.parking}/>
                    <InlineEdit label="breakfast" value={meta.breakfast} setValue={meta.breakfast}/>
                    <InlineEdit label="Pets" value={meta.pets} setValue={meta.pets}/>
                    */}
                    <InlineEdit label="Location" value={location} setValue={location}/>

                    {/*
                    <InlineEdit label="Address" value={location.address} setValue={location.address}/>
                    <InlineEdit label="City" value={location.city} setValue={location.city}/>
                    <InlineEdit label="Zip" value={location.zip} setValue={location.zip}/>
                    <InlineEdit label="Country" value={location.country} setValue={location.country}/>
                    <InlineEdit label="Lat" value={location.lat} setValue={location.lat}/>
                    <InlineEdit label="Lng" value={location.lng} setValue={location.lng}/>
                    */}

                    {/* Add other fields for editing */}
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={onCancelEdit}>Cancel</button>
                </form>
            ) : (
                // Render the original item
                <>
                    <Typography.Title level={2}>{name}</Typography.Title>
                    <Typography.Paragraph>{description}</Typography.Paragraph>
                    <Typography.Paragraph>{media}</Typography.Paragraph>
                    <Typography.Paragraph>{price}</Typography.Paragraph>
                    <Typography.Paragraph>{maxGuests}</Typography.Paragraph>
                    <Typography.Paragraph>{rating}</Typography.Paragraph>
                    <Typography.Paragraph>{created}</Typography.Paragraph>
                    <Typography.Paragraph>{updated}</Typography.Paragraph>

                    <div>
                        <Typography.Paragraph>{meta.wifi}</Typography.Paragraph>
                        <Typography.Paragraph>{meta.parking}</Typography.Paragraph>
                        <Typography.Paragraph>{meta.breakfast}</Typography.Paragraph>
                        <Typography.Paragraph>{meta.pets}</Typography.Paragraph>
                    </div>


                    {location.map((item) => (
                        <div key={item.location}>
                            <Typography.Paragraph>{item.location.address}</Typography.Paragraph>
                            <Typography.Paragraph>{item.location.city}</Typography.Paragraph>
                            <Typography.Paragraph>{item.location.zip}</Typography.Paragraph>
                            <Typography.Paragraph>{item.location.country}</Typography.Paragraph>
                            <Typography.Paragraph>{item.location.continent}</Typography.Paragraph>
                            <Typography.Paragraph>{item.location.lat}</Typography.Paragraph>
                            <Typography.Paragraph>{item.location.lng}</Typography.Paragraph>
                        </div>
                    ))}

                    {isAuthenticated && ( // Render the edit and delete buttons if the user is authenticated
                        <>
                            <button onClick={() => onEdit(id)}>Edit</button>
                            <button onClick={() => onDelete(id)}>Delete</button>
                        </>)}
                </>
            )}
        </Content>
    );
}
