import {Typography} from '@mui/material';

export default function Bookings() {

    return (
        <>
            <Typography variant={"h2"}>Your Bookings</Typography>

        </>
    );
}

/*


  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "dateFrom": "2023-04-19T22:25:07.406Z",
    "dateTo": "2023-04-19T22:25:07.406Z",
    "guests": 0,
    "created": "2023-04-19T22:25:07.406Z",
    "updated": "2023-04-19T22:25:07.406Z",
    "venue": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "description": "string",
      "media": "string",
      "price": 0,
      "maxGuests": 1,
      "created": "2023-04-19T22:25:07.406Z",
      "updated": "2023-04-19T22:25:07.406Z",
      "meta": {
        "wifi": true,
        "parking": true,
        "breakfast": true,
        "pets": true
      },
      "owner": {
        "name": "string",
        "email": "string",
        "avatar": "string"
      }
    },
    "customer": {
      "name": "string",
      "email": "string",
      "avatar": "string"
    }
  }
]

 */