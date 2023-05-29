import {Typography} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import {Content} from 'antd/lib/layout/layout';
import {useFormik} from 'formik';
import React, {useContext} from 'react';
import 'react-calendar/dist/Calendar.css';
import {venueSchema} from './schema';
import {API_VENUES} from '../../../utilities/constants';
import useApiPost from '../../../hooks/useApiPost';
import {AuthenticationContext} from '../../../context/AuthenticationContext';

const CreateVenue = () => {
    const {isAuthenticated} = useContext(AuthenticationContext);

    const newVenue = {
        name: "string", // Required
        description: "string", // Required
        media: ["string"], // Optional
        price: 0, // Required
        maxGuests: 0, // Required
        rating: 0, // Optional (default: 0)
        meta: {
            wifi: true, // Optional (default: false)
            parking: true, // Optional (default: false)
            breakfast: true, // Optional (default: false)
            pets: true // Optional (default: false)
        },
        location: {
            address: "string", // Optional (default: "Unknown")
            city: "string", // Optional (default: "Unknown")
            zip: "string", // Optional (default: "Unknown")
            country: "string", // Optional (default: "Unknown")
            continent: "string", // Optional (default: "Unknown"),
            lat: 0, // Optional (default: 0)
            lng: 0 // Optional (default: 0)
        }
    };

    const {data: postVenueData, isLoading, isError, postData} = useApiPost(API_VENUES, isAuthenticated, newVenue);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            media: [],
            price: 0,
            maxGuests: 0,
            rating: 0,
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
            address: '',
            city: '',
            zip: '',
            country: '',
            continent: '',
            lat: 0,
            lng: 0,
        },
        validationSchema: venueSchema, // Use the imported registrationSchema
        onSubmit: async (userFormData) => {
            try {
                const response = await postData(userFormData);
                if (response) {
                    console.log('New Venue Successfully Created', response);
                    console.log('New Venue Successfully Created', response.data);
                    return postVenueData(response, userFormData);
                }
                console.log('New Venue Successfully Created', response);
                return response;
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className='create-venue-modal form'>
            <Content className="form-content" style={{paddingTop: "10px", paddingBottom: "10px", display: "flex", flexDirection: "column"}}>
                <form onSubmit={formik.handleSubmit}
                      style={{minWidth: '340px', maxWidth: '340px', margin: '0 auto', paddingTop: '40px'}}>
                    <Typography.Title level={2}>Create Venue</Typography.Title>
                    {formik.status && <p>{formik.status}</p>}
                    {isLoading && <p className="form-error">Loading...</p>}
                    {isError && (<p className="form-error">* Error: <span className="form-error">{postVenueData?.errors?.[0]?.message}</span></p>)}
                    {/* NAME */}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter the name of the venue"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="form-error">* {formik.errors.name}</div>
                        ) : null}
                    </div>
                    {/* DESCRIPTION */}
                    <div>
                        <label htmlFor="description">Description</label>
                        <TextArea
                            defaultValue='Write a description of the venue'
                            id="description"
                            name="description"
                            placeholder="Write a description of the venue"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            showCount
                            maxLength={500}
                            height={100}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="form-error">* {formik.errors.description}</div>
                        ) : null}
                    </div>
                    {/* MEDIA */}
                    <div>
                        <label htmlFor="media">Media</label>
                        <input
                            id="media"
                            name="media"
                            type="text"
                            multiple
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={(event) => formik.values.media = event.target.files}
                        />
                        {formik.values.media === 0 ? (
                            <span>No files added</span>
                        ) : (
                            <output name="media" htmlFor="media">
                                {formik.values.media.map((file) => (
                                    <span key={file.name}>{file.name}</span>
                                ))}
                            </output>
                        )}

                        {formik.touched.media && formik.errors.media ? (
                            <div className="form-error">* {formik.errors.media}</div>
                        ) : null}
                    </div>
                    {/* PRICE */}
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Enter the price of the venue"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                        />
                        {formik.touched.price && formik.errors.price ? (
                            <div className="form-error">* {formik.errors.price}</div>) : null}
                    </div>
                    {/* MAX GUESTS */}
                    <div>
                        <label htmlFor="maxGuests">Max Guests</label>
                        <input
                            id="maxGuests"
                            name="maxGuests"
                            type="number"
                            placeholder="Enter the max number of guests"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.maxGuests}
                        />
                        {formik.touched.maxGuests && formik.errors.maxGuests ? (
                            <div className="form-error">* {formik.errors.maxGuests}</div>
                        ) : null}
                    </div>
                    {/* RATING */}
                    {/* META: wifi parking breakfast pets */}
                    {/* LOCATION: address, city, zip, country, continent, lat, lng */}
                    <div>
                        <Title level={4}>Location</Title>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Enter the address of the venue"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <div className="form-error">* {formik.errors.address}</div>) : null}
                            <label htmlFor="city">City</label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="Enter the city of the venue"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                            />
                            {formik.touched.city && formik.errors.city ? (
                                <div className="form-error">* {formik.errors.city}</div>) : null}
                        </div>
                        <div>
                            <label htmlFor="zip">Zip</label>
                            <input
                                id="zip"
                                name="zip"
                                type="text"
                                placeholder="Enter the zip of the venue"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.zip}
                            />
                            {formik.touched.zip && formik.errors.zip ? (
                                <div className="form-error">* {formik.errors.zip}</div>) : null}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="Enter the country of the venue"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country}
                        />
                        {formik.touched.country && formik.errors.country ? (
                            <div className="form-error">* {formik.errors.country}</div>) : null}
                    </div>
                    <button className="primary-button" type="submit" style={{marginTop: "20px"}}>Create New Venue
                    </button>
                </form>
            </Content>
        </div>
    );
}

export default CreateVenue;