# E-Commerce Marketplace Backend

## Introduction

This is the backend implementation for a E-commerce marketplace where Seller can create new Store, catalog, Products, and received order by customer, and the customer can checkout all the seller, their store and product and make a order of products. 

## Technologies Used

- Node.js
- Express.js
- MongoDB
- RESTful API

## How to start

```
  npm i

  npm run dev
```
  
## Tasks

This project involves implementing the following tasks:

## 1) Create a User - Registration using POST
   
- Endpoint: ```http://localhost:1234/api/v1/auth/register```
- Method: POST
- Request Body: JSON
```json
  {
      "username": "Ambani",
      "password": "Nita@143",
      "type": "seller"     // [ seller /  buyer ] 
  }
```

- Description:  
    - This task involves creating a new user with a username, password and type and by default createdAt and UpdatedAt is present with every entry.
    - It checks whether there is already user exist, if not then hashed the password and created new user with sepecific role. Role can be Seller or Buyer.


## 2) Create a User - Login using POST
   
- Endpoint: ```http://localhost:1234/api/v1/auth/login```
- Method: POST
- Request Body: JSON
```json
  {
      "username": "Ambani",
      "password": "Nita@143",
  }
```

- Description:  
    - This task involves login a user with a username and password by default createdAt and UpdatedAt is present with every entry.
    - It checks whether there is already user exist, if not then send response no username exist, otherwise verify hashed password, generate JWT token and added to user body for the session period of 2 hours.


## 3) Create a Seller Store using POST
   
- Endpoint: ```http://localhost:1234/api/v1/createBusiness```
- Method: POST
- Request Body: JSON
```json
  {
      "name": "Ambani",
      "email": "ambani@yahoo",
  }
```

- Description:  
    - This task involves creating a new store place for a seller and by default createdAt and UpdatedAt is present with every entry.
    - It checks whether there is already store exist with same name or user, if not then created a new store for seller.
      
 
## 4) Fetching a Seller Store using GET
   
- Endpoint: ```http://localhost:1234/api/v1/getBusiness```
- Method: GET

- Description:  
    - This task involves fetching a store place for a seller.
    - This only work when an valid seller is login
 
## 5) Create a Seller Store's Catalog using POST
   
- Endpoint: ```http://localhost:1234/api/v1/createCatalog```
- Method: POST
- Request Body: JSON
```json
  {
      "name": "Jio",
  }
```

- Description:  
    - This task involves creating a new catalog for a seller and by default createdAt and UpdatedAt is present with every entry.
    - It checks whether there is already store catalog exist with same name or user, if not then created a new store for seller and only one catalog can be assigned to a seller.
      

## 6) Fetching a Seller Catalog using GET
   
- Endpoint: ```http://localhost:1234/api/v1/getCatalog```
- Method: GET

- Description:  
    - This task involves fetching a store catalog for a seller.
    - This only work when an valid seller is login

 
## 7) Create a Seller Product using POST
   
- Endpoint: ```http://localhost:1234/api/v1/createProduct```
- Method: POST
- Request Body: JSON
```json
  {
      "name": "Jio Phones",
      "price": 2000
  }
```

- Description:  
    - This task involves creating a new prdouct for a seller catalog and by default createdAt and UpdatedAt is present with every entry.
    - It add the product with the price.
      

## 8) Fetching a Seller Product using GET
   
- Endpoint: ```http://localhost:1234/api/v1/getProducts```
- Method: GET

- Description:  
    - This task involves fetching a store product for a seller.
    - This only work when an valid seller is login

## 9) Fetching a Buyer Order using GET
   
- Endpoint: ```http://localhost:1234/api/v1/orders```
- Method: GET

- Description:  
    - This task involves fetching all the order added to the order database and only the order assigned to store is shown only



 ## 10) Fetching  Seller List using GET
   
- Endpoint: ```http://localhost:1234/api/v1/list-of-sellers```
- Method: GET

- Description:  
    - This task involves fetching all the Store name added to the Store database.
      

 ## 10) Fetching a Seller List of products using GET
   
- Endpoint: ```http://localhost:1234/api/v1/seller-catalog/:seller_id```
- Method: GET

- Description:  
    - This task involves fetching all the Store Product added to the Store.
  
      
 ## 10) Create a Product Order using POST
   
- Endpoint: ```http://localhost:1234/api/v1/orderProduct/:seller_id```
- Method: POST
- Request Body: JSON
```json
  {
    orders: [
      {
        "name": "Jio Phones",
        "price": 2000
      },
      {
        "name": "Jio TV",
        "price": 200000
      },
      {
        "name": "Jio WIFI",
        "price": 2100
      }
    ]
  }
```

- Description:  
    - This task involves ordering the items with name and price in array.
      

## Models

- This project uses the following data models:

- Buyer Model
```
  username: string
  customerId: string
```

- Catalog Model
```
  catalogName: string
  businessId: string
  catalogItem: [ String ]
```

- Order Model
```
  orders: [ String ]
  businessId: string
  customerId: string
```

- Product Model
```
  name: string
  price: string
  businessId : string
  catalogId: String
```

- Seller Model
```
  username: string
  name: string
  email: string
  businessId: string
  catalog: [ String ]
```

- User Model
```
  username: string
  password: string
  type: string
```
