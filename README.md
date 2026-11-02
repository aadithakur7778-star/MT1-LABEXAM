MT1-LABEXAM – Shopping Cart Management

Project Description

A Shopping Cart Management Web Application developed using Node.js and Express.js.

Technologies Used

- Node.js
- JavaScript
- HTTP Module
- FS Module
- Express.js
- EchoAPI
- Git & GitHub

Project Structure

- "httpServer.js" – HTTP server and routing (Port 3000)
- "expressApp.js" – Express REST API and CRUD operations (Port 4000)
- "public/index.html" – HTML page served using FS module
- "screenshots/" – Practical testing screenshots

How to Run

Install dependencies:

npm install

Start HTTP Server:

node httpServer.js

Start Express Server in another terminal:

node expressApp.js

API Endpoints

Method| Endpoint| Operation
GET| /cart| Get all products
GET| /cart/:id| Get product by ID
POST| /cart| Add product
PUT| /cart/:id| Update product
DELETE| /cart/:id| Delete product

Database

JavaScript array is used to store shopping cart items. No database is required.

Author

BTech – Computer Science Engineering
