# Load Delivery Service

## Screenshots

![image](https://github.com/sukhanova1/delivery-app/assets/102801240/6e9fdb72-abf1-49fc-9287-0e6368856979)
![image](https://github.com/sukhanova1/delivery-app/assets/102801240/39c408e4-c4bd-48a6-bd78-528bbcc689d8)
![image](https://github.com/sukhanova1/delivery-app/assets/102801240/2550e457-d81d-470d-8861-28f05a48658d)
![image](https://github.com/sukhanova1/delivery-app/assets/102801240/96640ca0-1c81-4034-967b-1305ec0c9119)
![image](https://github.com/sukhanova1/delivery-app/assets/102801240/c16e9de3-2f72-46e3-90a6-dc6b4b80e899)
![image](https://github.com/sukhanova1/delivery-app/assets/102801240/9b0d10fb-0464-42cc-9617-dad85b817200)

## About

Load Delivery Service is a web application with a user-friendly interface (desktop-only), designed to improve the logistics process and ensure smooth and effective collaboration between drivers and shippers.
Whether you're a shipper looking to transport goods or a driver seeking delivery opportunities, our platform is your go-to solution.

Drivers can effortlessly handle truck assignments, generate insightful reports, and manage trucks, while shippers enjoy seamless load creation, editing, and tracking capabilities.

To log in as a driver use:
```shell
email: driver@email.com
password: driver123
```

To log in as a shipper use:
```shell
email: shipper@email.com
password: shipper123
```

### Technology Stack

* Frontend: Developed using React.js, CSS, Redux, Redux Saga, Axious for a dynamic user interface.
* Backend: Powered by Node.js and Express to handle server-side logic and facilitate seamless communication between the fronted and database.
* Database: MongoDB serves as a robust database to store and manage all data efficiently.

## Key Features

* role-based access (driver, shipper);
* JWT Authentication;
* account management (change password, delete account);
* recovery of forgotten password;
* adding/editing/deleting/ loads (available for shipper's role);
* posting loads to find a driver (available for shipper's role);
* sort loads by status (available only for shipper);
* adding/editing/deleting/assigning tucks (available for driver's role);
* generating report about shipped loads (available for driver's role);
* navigation between pages;

## Running Application

After cloning, in the server folder run `npm install` to install all dependencies, then run `npm start`.

In the client folder run `npm install`. To start the development server run `npm start` and navigate to http://localhost:3000/ to view the application in your browser. 

To build the app for production run `npm run build`.
