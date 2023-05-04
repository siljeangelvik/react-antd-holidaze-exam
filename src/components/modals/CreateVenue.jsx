import {Button, Checkbox, Form, Typography} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';

export default function CreateVenue(venueData) {
    let [value, setValue] = useState(venueData);

    const {name, description, media, price, maxGuests} = venueData;

    const onChange = (e) => { // this is the function that will be called when the checkbox is clicked
        console.log(`checked = ${e.target.checked}`);
        if (e.target.checked) {
            console.log("checked");
            setValue(e.target.value = true);
            setValue(value);
        } else {
            console.log("unchecked");
            value = false;
        }
    };

    console.log(venueData);

    return (
        <>
            <Form layout="vertical" style={{minWidth: "340px", maxWidth: "340px", margin: "0 auto"}}>
                <Typography.Title level={2}>Create Venue</Typography.Title>

                <Form.Item label="Name of Venue">
                    <input
                        value={name}
                        type="string"
                        name="name"
                        placeholder="Name of Venue"
                        required={true}
                        pattern={"[A-Za-z]+"}
                        style={{
                            padding: "9px",
                            borderRadius: "7px",
                            border: "1px solid lightgray",
                            display: "block",
                            width: "100%"
                        }}
                    />
                </Form.Item>

                <Form.Item label="Description of Venue">
                    <TextArea
                        value={description}
                        type="string"
                        name="description"
                        placeholder="Write a description of the venue"
                        required={true}
                        autoSize={{
                            width: "100%",
                            minRows: 3,
                            maxRows: 5,
                        }}
                    />
                </Form.Item>

                <Form.Item label="Images of Venue">
                    <input
                        value={media}
                        type="[string]"
                        name="media"
                        placeholder="Add images of the venue"
                        style={{
                            padding: "9px",
                            borderRadius: "7px",
                            border: "1px solid lightgray",
                            display: "block",
                            width: "100%"
                        }}
                    />
                </Form.Item>

                <Form.Item label="Price of Venue /night">
                    <input
                        value={price}
                        min={0}
                        type="number"
                        name="price"
                        placeholder="$1,000"
                        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                        required={true}
                        style={{
                            padding: "9px",
                            borderRadius: "7px",
                            border: "1px solid lightgray",
                            display: "block",
                            width: "100%"
                        }}
                    />
                </Form.Item>

                <Form.Item label="Max Guests">
                    <input
                        value={maxGuests}
                        min={0}
                        type="number"
                        name="maxGuests"
                        placeholder="500"
                        required={true}
                        style={{
                            padding: "9px",
                            borderRadius: "7px",
                            border: "1px solid lightgray",
                            display: "block",
                            width: "100%"
                        }}
                    />
                </Form.Item>

                <Form.Item label="Amenities">
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Checkbox onChange={onChange} name="wifi">WiFi Included</Checkbox>
                        <Checkbox onChange={onChange} name="parking">Parking Included</Checkbox>
                        <Checkbox onChange={onChange} name="breakfast">Breakfast Included</Checkbox>
                        <Checkbox onChange={onChange} name="pets">Pets Allowed</Checkbox>
                    </div>
                </Form.Item>

                <Button onChange={(e) => setValue(e.target.value)}
                        type="primary" htmlType="submit" style={{width: "100%"}}>
                    Create Venue
                </Button>
            </Form>
        </>
    )
}

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