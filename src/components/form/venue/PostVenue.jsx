import TextArea from 'antd/es/input/TextArea';
import React, {useContext} from 'react';
import {Form, Typography} from 'antd';
import "./styles.css";
import {VenuesContext} from '../../../context/VenuesContext';
import useToggle from '../../../hooks/useToggle';
import useApiPost from '../../../hooks/useApiPost';
import {API_VENUES} from '../../../utilities/constants';
import {venueSchema} from './schema';
import {useFormik} from 'formik';

export const PostVenue = () => {
    const [toggle, setToggle] = useToggle(false);
    const {userVenues, addVenue} = useContext(VenuesContext);

    const {data, isLoading, isError, postData} = useApiPost(API_VENUES, addVenue);

    const handleClose = () => {
        setToggle(!toggle);
    };

    const handleCheckboxChange = (event) => {
        const newValue = event.target.checked;
        formik.setFieldValue('venueManager', newValue);
        console.log(newValue);
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            media: '',
            price: '',
            maxGuests: '',
            wifi: '',
            parking: '',
            breakfast: '',
            pets: '',
        },
        validationSchema: venueSchema,
        onSubmit: async (postVenueData) => {
            try {
                const response = await postData(postVenueData, data);
                if (response) {
                    console.log('Venue created successfully', response);
                    addVenue(response,userVenues);
                }
            } catch (error) {
                console.log('Venue creation failed', error);
            }
            handleClose();
        },
    });

    return (
        <div className='create-venue-modal form' handletoggle={toggle} style={{display: toggle && "none"}}>
            <button className="secondary-button" onClick={setToggle}
                    style={{margin: "40px 0 0 40px", width: "120px"}}>Close
            </button>
            <form className="form" onSubmit={formik.handleSubmit}
                  style={{minWidth: '340px', maxWidth: '340px', margin: '0 auto'}}>
                <Typography.Title level={2}>Create Venue</Typography.Title>
                {isLoading && <p className="form-error">Loading...</p>}
                {isError && (<p className="form-error">Error: {data?.errors?.[0]?.message}</p>)}

                {/* NAME */}
                <div>
                    <label htmlFor="name">Name of Venue</label>
                    <input
                        value={formik.values.name}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name of Venue"
                        aria-label="name"
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="form-error">* {formik.errors.name}</div>) : null}
                </div>
                {/* DESCRIPTION */}
                <div>
                    <label htmlFor="description">Description of Venue</label>

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
                        <div className="form-error">* {formik.errors.description}</div>) : null}
                </div>
                {/* MEDIA */}
                <div>
                    <label htmlFor="media">Add images of venue</label>
                    <input
                        value={formik.values.media}
                        type="text"
                        name="media"
                        id="media"
                        placeholder="Add images of the venue"
                        aria-label="media"
                        onChange={formik.handleChange}
                    />
                    {formik.touched.media && formik.errors.media ? (
                        <div className="form-error">* {formik.errors.media}</div>) : null}
                </div>
                {/* PRICE */}
                <div>
                    <label htmlFor="price">Price of Venue /night</label>
                    <input
                        value={formik.values.price}
                        type="number"
                        name="price"
                        id="price"
                        placeholder="$1,000"
                        aria-label="price"
                        required
                        min={1}
                        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                        onChange={formik.handleChange}
                    />
                    {formik.touched.price && formik.errors.price ? (
                        <div className="form-error">* {formik.errors.price}</div>) : null}
                </div>
                {/* MAX GUESTS */}
                <div>
                    <label htmlFor="maxGuests">Max Guests</label>
                    <input
                        value={formik.values.maxGuests}
                        type="number"
                        name="maxGuests"
                        id="maxGuests"
                        placeholder="Max Guests"
                        aria-label="maxGuests"
                        required
                        min={1}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.maxGuests && formik.errors.maxGuests ? (
                        <div className="form-error">* {formik.errors.maxGuests}</div>) : null}
                </div>
                {/* LOCATION: Address, City */}
                <div>
                    <label htmlFor="address">Address of Venue</label>
                    <input
                        value={formik.values.address}
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address of Venue"
                        aria-label="address"
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="city">City of Venue</label>
                    <input
                        value={formik.values.city}
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City of Venue"
                        aria-label="city"
                        onChange={formik.handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="wifi">Wifi</label>
                    <input
                        value={formik.values.wifi}
                        type="checkbox"
                        name="wifi"
                        id="wifi"
                        placeholder="Wifi"
                        aria-label="wifi"
                        onChange={handleCheckboxChange}
                    />
                </div>
                <Form.Item>
                    <button type="submit" className="primary-button" style={{width: '100%'}}>
                        Create Venue
                    </button>
                </Form.Item>
            </form>
        </div>
    );
};