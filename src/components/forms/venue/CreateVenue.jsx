import {Button, Form, Input, Typography} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';
import {Checkbox} from 'antd';
import "./styles.css";


export const CreateVenue = (createVenueData) => {
    let [value, setValue] = useState(createVenueData);
    const {name, description, media, price, maxGuests} = createVenueData;

    console.log(createVenueData);

    /*
    const [venueName, setVenueName] = useState("");
    const [venueDescription, setVenueDescription] = useState("");
    const [venueMedia, setVenueMedia] = useState("");
    const [venuePrice, setVenuePrice] = useState(0);
    const [venueMaxGuests, setVenueMaxGuests] = useState(0);
    const [wifi, setWifi] = useState(false);
    const [parking, setParking] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [pets, setPets] = useState(false);

    const {createVenueFormData} = [venueName, venueDescription, venueMedia, venuePrice, venueMaxGuests, wifi, parking, breakfast, pets];
    */

    const onChange = (e) => {
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

    console.log(createVenueData);

    const onSubmit = ({createVenue}) => {
        console.log(typeof createVenue);

        createVenue({
            variables: {
                name: name,
                description: description,
                media: media,
                price: price,
                maxGuests: maxGuests,
                meta: {
                    wifi: value,
                    parking: value,
                    breakfast: value,
                    pets: value
                }
            }
        });
    }

    return (
        <>
            <div className={"create-venue-modal"}>
                <Form form={createVenueData} onFinish={onSubmit}
                    layout="vertical"
                      style={{minWidth: "340px", maxWidth: "340px", margin: "0 auto", paddingTop: "40px"}}>

                    <Typography.Title level={2}>Create Venue</Typography.Title>

                    <Form.Item label="Name of Venue">
                        <Input
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
                        <Input
                            value={media}
                            type="[string]"
                            name="media"
                            placeholder="Add images of the venue"

                        />
                    </Form.Item>

                    <Form.Item label="Price of Venue /night">
                        <Input
                            value={price}
                            min={0}
                            type="number"
                            name="price"
                            placeholder="$1,000"
                            pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                            required={true}
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
                            type="submit" htmlType="submit" style={{width: "100%"}} className={"primary-button"}>
                        Create Venue
                    </Button>
                </Form>
            </div>
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