export interface User {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      postcode: string;
    };
    email: string;
    login: {
      uuid: string;
    };
    dob: {
      date: string;
      age: number;
    };
    phone: string;
    cell: string;
    picture: {
      large: string;
    };
  }