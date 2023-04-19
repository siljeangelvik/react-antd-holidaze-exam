function BookVenue() {


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

    return (
        <div>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    );
}

export default BookVenue;


// RESPONSE:

/*

Object {
name: "SiAvAng",
email: "siljeavenaangelvik@noroff.no",
avatar: null, venueManager: false,
accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc5LCJuYW1lIjoiU2lBdkFuZyIsImVtYWlsIjoic2lsamVhdmVuYWFuZ2VsdmlrQG5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwidmVudWVNYW5hZ2VyIjpmYWxzZSwiaWF0IjoxNjgxODc3MTQzfQ.hlATxgtLFcQLxMrD-TiOyQPptqrg6PkHV8_IQMpEhHs" }

 */



/*

        localStorage.setItem("accessToken", json.accessToken);
            localStorage.setItem("name", json.name);
            localStorage.setItem("email", json.email);
            localStorage.setItem("manager", json.manager);
            localStorage.setItem("avatar", json.avatar);

 */