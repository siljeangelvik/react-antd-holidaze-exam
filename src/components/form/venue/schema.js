import * as Yup from 'yup';

export const venueSchema = Yup.object({
    name: Yup.string().required('Please enter the name of the venue'),
    description: Yup.string().required('Please enter the description of the venue'),
    media: Yup.array().of(
        Yup.string()
            .url('Please enter a valid URL')
            .matches(/\.(jpeg|jpg|png)$/, 'Please enter a valid image URL')
    ),
    price: Yup.number()
        .required('Please enter the price of the venue')
        .positive('Price must be a positive number')
        .typeError('Price must be a number'),
    maxGuests: Yup.number()
        .required('Please enter the maximum number of guests')
        .integer('Max Guests must be an integer')
        .positive('Max Guests must be a positive number')
        .typeError('Max Guests must be a number'),
    rating: Yup.number()
        .positive('Rating must be a positive number')
        .max(5, 'Rating must be less than 5')
        .typeError('Rating must be a number'),
    meta: Yup.object({
        wifi: Yup.boolean(),
        parking: Yup.boolean(),
        breakfast: Yup.boolean(),
        pets: Yup.boolean(),
    }),
    location: Yup.object({
        address: Yup.string(),
        city: Yup.string(),
        zip: Yup.string(),
        country: Yup.string(),
        continent: Yup.string(),
        lat: Yup.number()
            .positive('Latitude must be a positive number')
            .typeError('Latitude must be a number'),
        lng: Yup.number()
            .positive('Longitude must be a positive number')
            .typeError('Longitude must be a number'),
    }),
});

// REQUEST
/*
{
  "name": "string",                 // Required
  "description": "string",          // Required
  "media": ["string"],              // Optional
  "price": 0,                       // Required
  "maxGuests": 0,                   // Required
  "rating": 0,                      // Optional (default: 0)
  "meta": {
    "wifi": true,                   // Optional (default: false)
    "parking": true,                // Optional (default: false)
    "breakfast": true,              // Optional (default: false)
    "pets": true                    // Optional (default: false)
  },
  "location": {
    "address": "string",            // Optional (default: "Unknown")
    "city": "string",               // Optional (default: "Unknown")
    "zip": "string",                // Optional (default: "Unknown")
    "country": "string",            // Optional (default: "Unknown")
    "continent": "string",          // Optional (default: "Unknown"),
    "lat": 0,                       // Optional (default: 0)
    "lng": 0                        // Optional (default: 0)
  }
}
 */