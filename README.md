# NOISE - SLEEP TRACKER APP

## A basic RESTful API using NodeJs and Express allowing users to store and retrieve user sleep data.

## LIVE:

   ```bash
   https://noise-sleep-tracker-app.onrender.com/
   ```
   The API is deployed on render, which makes instances spin down with inactivity, so if you are using the live api, you may have to wait a minute or so before API responds for first time

## Technologies Used

- **Express.js:** A web application framework for building APIs and handling server-side logic.
- **Node.js:** A runtime environment for executing JavaScript code on the server.
- **MongoDB:** A cross-platform, document-oriented database program
- **Jest:** A testing framework designed to ensure correctness of any JavaScript codebase
- **Render:** A unified cloud to build and run all your apps and websites

## Features

The main purpose of this API is to help its user keep track of their sleep data

### Endpoints

```bash
1. /record/sleep
```
Requires userId and number of hours in json format to be sent along to store in mongoDB database<br>
<br>Incase of successfull creation, it returns:
- Status code of 201
- Message of record successfully created
- Record ID<br><br>Incase submission fails, it returns:
- error message
- exit status code of 40*
- Success: false

```bash
2. /record/getRecord/:userId
```
Requires only userId as a query parameter and will return all the records for a given userId
Returns a empty object in case no record for a given user is found
Can specify sort by and order by through request body to get data in that format

```bash
3. /record/deleteRecord/:recordId
```
Requires only record Id as a query parameter and will delete the specified query from the database
Returns a error message if no such record is found
Returns statusCode of 200 in case of successful deletion or 40* in case of failure

## For Developers and Contributors

### Project Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/SATZEL02/noise-sleep_tracker_app.git
    cd noise-sleep_tracker_app

2. **Install the dependencies:**
 
   ```bash
   npm install
   
3. **Environment Variables:**

   Only requires url to MongoDB database for connection, name it as:
   ```bash
   MONGODB_URL

4. **Start the server:**
  
   ```bash
   node index.js


## Testing

   Implemented Unit Testing through JEST and SUPERTEST
   If you want to add more test, create new file under _\_test__ folder with name *.test.js and write your test there

## To Do

* Add user validation feature in case any authorized person accesses database
* Add feature to give average weekly sleep duration
