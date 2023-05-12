import {Button, Form, Input, Typography} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';
import {Checkbox} from 'antd';
import "./styles.css";
import useApiPost from '../../../hooks/useApiPost';
import {API_VENUES} from '../../../utilities/constants';

export const CreateVenue = ({onCreate}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        media: [],
        price: 0,
        maxGuests: 0,
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
    });

    const {postData} = useApiPost(API_VENUES);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await postData(formData);
            onCreate(data);
            setFormData({
                name: '',
                description: '',
                media: [],
                price: 0,
                maxGuests: 0,
                wifi: false,
                parking: false,
                breakfast: false,
                pets: false,
            });
            console.log('Venue created successfully');
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

    return (
        <div className={'create-venue-modal'}>
            <form onSubmit={onSubmit}
                  style={{minWidth: '340px', maxWidth: '340px', margin: '0 auto', paddingTop: '40px'}}>
                <Typography.Title level={2}>Create Venue</Typography.Title>

                <Form.Item label="Name of Venue">
                    <Input
                        value={formData.name}
                        type="string"
                        name="name"
                        id="name"
                        placeholder="Name of Venue"
                        aria-label="name"
                        required
                        pattern="[A-Za-z]+"
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

                <Form.Item label="Description of Venue">
                    <TextArea
                        value={formData.description}
                        type="string"
                        name="description"
                        id="description"
                        aria-label="description"
                        placeholder="Write a description of the venue"
                        required
                        min={0}
                        onChange={handleInputChange}
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
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        Create Venue
                    </Button>
                </Form.Item>
            </form>
        </div>
    );
};


/*

Party Venue

Introducing a stunning wedding venue available for rent! This enchanting space is perfect for couples who are looking for a romantic and memorable location to tie the knot. With its elegant and sophisticated decor, the venue boasts a spacious main hall that can accommodate up to 200 guests. The hall is adorned with beautiful chandeliers, draped ceilings, and large windows that let in plenty of natural light. The venue also features a charming outdoor area with lush gardens and a serene pond, providing the perfect backdrop for unforgettable wedding photos. With an experienced team of event planners and catering staff, this wedding venue offers everything you need to make your big day a success.

https://cdn.pixabay.com/photo/2017/08/08/00/17/events-2609526_1280.jpg, https://cdn.pixabay.com/photo/2016/03/27/18/53/drinks-1283608_1280.jpg, https://cdn.pixabay.com/photo/2013/09/05/10/38/catering-179046_1280.jpg

500

200



 */


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