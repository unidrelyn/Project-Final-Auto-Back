# AUTOEXCHANGE

## Description

car buying and selling database connection 

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start navegate for the app
-  **Login:** As a user I can login to the platform so that I can see all cars
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Cars** As a user I can add a car
-  **List Cars** As a user I want to see the cars so that I can choose one to eat
-  **Search Cars** As a user I want to search cars by name so that I know if it´s already in the platform

# Server

## Models

User model

```
name - String // required
email - String // required & unique
password - String // required

Car model

```
id - String // required
price - String // required
class - String
cylinders - String
drive - String
fueel type - String
brand - String
model - String
transmission - String
year - Number
color - String
image - String

Order model

```
customerInfo - Object { fullName -String, email - String, address - String}
items - String // required & unique
paymentMethod - String // required

## API Endpoints/Backend Routes

- POST /auth/signup
  - body:UserModel
- POST /auth/login
  - body: UserModel
- POST /auth/logout
  - body: (empty)
- POST /api/orders
  - body: OrderModel
- GET /api/orders
- DELETE /api/cars/:carsId
- GET /api/cars
- POST /api/cars
  - body: CarModel
- GET /api/cars/:carId
- PUT /api/cars/:carsId

### Git

The url to your repository and to your deployed project

[https://github.com/unidrelyn/Project-Final-Auto](Client)
[https://github.com/unidrelyn/Project-Final-Auto-Back](Server)

[https://autoexchange.netlify.app](Deploy)
