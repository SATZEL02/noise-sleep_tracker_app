# NOISE - SLEEP TRACKER APP

##A basic RESTful API using NodeJs and Express allowing users to store and retrieve user sleep data.

## Technologies Used

- **Express.js:** A web application framework for building APIs and handling server-side logic.
- **Node.js:** A runtime environment for executing JavaScript code on the server.
- **MongoDB:** A cross-platform, document-oriented database program
- **Jest:** A testing framework designed to ensure correctness of any JavaScript codebase

## Features

The main purpose of this API is to help its user keep track of their sleep data

### Endpoints

```bash
1. /record/sleep
```
Requires userId and number of hours in json format to be sent along to store in mongoDB database
Returns the record Id of the new record.
Incase submission fails, error message is diplayed along with exit status code

```bash
2. /record/getRecord/:userId
```
Requires only userId as a query parameter and will return all the records for a given userId
Returns a empty object in case no record for a given user is found

```bash
3. /record/deleteRecord/:recordId
```
Requires only record Id as a query parameter and will delete the specified query from the database
Returns a error message if no such record is found
Returns statusCode of 200 in case of successful deletion or 40* in case of failure

## For Developers and Contributors

