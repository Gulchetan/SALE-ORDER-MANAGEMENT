# Sale Order Management System

This project is a Sale Order Management System that includes a mock REST API to manage sales orders with active and completed statuses.
Dummy username:user
Dummy password : password
## Prerequisites

Before running the project, ensure the following software is installed:
- **Node.js (v18 or above)**: Download and install Node.js from [Node.js official website](https://nodejs.org/).
- **React (v18 or above)**: Make sure React version 18 or above is used in the project.

## Setting Up the Project

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory
   cd SALE-ORDER-MANAGEMENT

3. Install the dependencies
   npm install

 ## Setting Up the Mock REST API
  To set up and run the mock REST API which serves the sales order data:
1. Install 'json-server' globally:
   
    npm install -g json-server

2. Start the mock REST API:
   npx json-server --watch db.json --port 3001
   
   Once the setup is complete and the mock REST API is running, you can start the project:
   npm start

   Additional Information
   The db.json file contains the mock data for the sales orders.
   The main application communicates with the mock REST API to fetch and update the sales order data.

