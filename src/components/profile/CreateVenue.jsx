import {Button, Checkbox, Form} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';

function CreateVenue() {
    let [value, setValue] = useState();

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

    console.log("Create Venue");

    return (
        <>
            <Form layout="vertical" style={{minWidth: "320px", maxWidth: "600px", margin: "0 auto"}}>
                <Form.Item label="Name of Venue">
                    <input
                        type="string"
                        name="name"
                        placeholder="Name of Venue"
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
                        type="string"
                        name="description"
                        placeholder="Write a description of the venue"
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                    />
                </Form.Item>

                <Form.Item label="Images of Venue">
                    <input
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
                        type="number"
                        name="price"
                        placeholder="Set the price of the venue"
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
                        type="number"
                        name="maxGuests"
                        placeholder="Set a limit for how many guests can stay at the venue"
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
                    <Checkbox onChange={onChange}>WiFi Included</Checkbox>
                    <Checkbox onChange={onChange}>Parking Included</Checkbox>
                    <Checkbox onChange={onChange}>Breakfast Included</Checkbox>
                    <Checkbox onChange={onChange}>Pets Allowed</Checkbox>
                </Form.Item>

                <Button onChange={(e) => setValue(e.target.value)}
                        type="primary" htmlType="submit" style={{width: "100%"}}>
                    Create Venue
                </Button>
            </Form>
        </>
    );
}

export default CreateVenue;