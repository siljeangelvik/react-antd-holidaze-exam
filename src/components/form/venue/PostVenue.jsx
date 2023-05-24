import React, {useState} from 'react';
import {Button, Form, Input, Typography} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {Checkbox} from 'antd';
import "./styles.css";
import useToggle from '../../../hooks/useToggle';
import {boolean, number, string} from 'yup';
import useApiPost from '../../../hooks/useApiPost';
import {API_VENUES} from '../../../utilities/constants';

export const PostVenue = ({onCreate}) => {
    // const {userProfile} = useContext(AuthenticationContext);
    const [toggle, setToggle] = useToggle(false);
    // const userProfileBookings = useApiGet(`${API_PROFILES}/${userProfile?.name}/bookings`);

    const handleToggle = () => {
        setToggle(toggle);
    };

    const [formData, setFormData] = useState({
        name: string,
        description: string,
        media: [string],
        price: number,
        maxGuests: number,
        wifi: boolean,
        parking: boolean,
        breakfast: boolean,
        pets: boolean,
    });
    const {isLoading, isError, postData} = useApiPost(API_VENUES);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await postData(formData);
            onCreate(data);
            setFormData(data);

            if (isLoading) return <div>Loading...</div>
            if (isError) return <div>Error</div>
            if (data) {
                console.log('Venue created successfully');
                return <div>Success</div>
            }

        } catch (error) {
            console.log('Venue creation failed', error);
        }
    };
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };
    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setFormData({...formData, [name]: checked});
    };

    // Need to fix the close button to close the modal !!
    return (
        <div className='create-venue-modal'>
            <button className="secondary-button" onClick={handleToggle}>Close</button>

            <div ontoggle={setToggle}>

                <form
                    className="form"
                    onSubmit={onSubmit}
                      style={{minWidth: '340px', maxWidth: '340px', margin: '0 auto', paddingTop: '40px'}}>
                    <Typography.Title level={2}>Create Venue</Typography.Title>

                    <Form.Item label="Name of Venue">
                        <input
                            value={formData.name}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name of Venue"
                            aria-label="name"
                            required
                            pattern="[A-Za-z]+"
                            onChange={handleInputChange}
                        />
                    </Form.Item>

                    <Form.Item label="Description of Venue">
                        <TextArea
                            value={formData.description}
                            type="text"
                            name="description"
                            id="description"
                            aria-label="description"
                            placeholder="Write a description of the venue"
                            onChange={handleInputChange}
                            required
                            autoSize={{
                                width: '100%',
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Images of Venue">
                        <Input
                            value={formData.media}
                            type="[string]"
                            name="media"
                            id="media"
                            placeholder="Add images of the venue"
                            aria-label="media"
                            optional
                            onChange={handleInputChange}
                        />
                    </Form.Item>

                    <Form.Item label="Price of Venue /night">
                        <Input
                            value={formData.price}
                            type="number"
                            name="price"
                            id="price"
                            placeholder="$1,000"
                            aria-label="price"
                            required
                            min={1}
                            pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                            onChange={handleInputChange}
                            style={{
                                padding: '9px',
                                borderRadius: '7px',
                                border: '1px solid lightgray',
                                display: 'block',
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Max Guests">
                        <Input
                            value={formData.maxGuests}
                            type="number"
                            name="maxGuests"
                            id="maxGuests"
                            placeholder="100"
                            aria-label="maxGuests"
                            required
                            min={1}
                            onChange={handleInputChange}
                            style={{
                                padding: '9px',
                                borderRadius: '7px',
                                border: '1px solid lightgray',
                                display: 'block',
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Wifi">
                        <Checkbox
                            value={formData.wifi}
                            type="boolean"
                            name="wifi"
                            id="wifi"
                            aria-label="wifi"
                            onChange={handleCheckboxChange}
                        />
                    </Form.Item>

                    <Form.Item label="Parking">
                        <Checkbox
                            value={formData.parking}
                            type="boolean"
                            name="parking"
                            id="parking"
                            aria-label="parking"
                            onChange={handleCheckboxChange}
                        />
                    </Form.Item>

                    <Form.Item label="Breakfast">
                        <Checkbox
                            value={formData.breakfast}
                            type="boolean"
                            name="breakfast"
                            id="breakfast"
                            aria-label="breakfast"
                            onChange={handleCheckboxChange}
                        />
                    </Form.Item>

                    <Form.Item label="Pets">
                        <Checkbox
                            value={formData.pets}
                            type="boolean"
                            name="pets"
                            id="pets"
                            aria-label="pets"
                            onChange={handleCheckboxChange}
                        />
                        <p>{formData.pets ? "Pets allowed" : "No pets allowed"}</p>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            Create Venue
                        </Button>
                    </Form.Item>
                </form>
            </div>

        </div>
   );
};
/*
{
  "name": "string",
  "description": "string",
  "media": [
    "string"
  ],
  "price": 0,
  "maxGuests": 0,
  "meta": {
    "wifi": true,
    "parking": true,
    "breakfast": true,
    "pets": true
  }
}
 */