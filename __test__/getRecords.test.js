import request from 'supertest';
import makeApp from '../app.js';

const getRecordsFromUserId = jest.fn();

//Argument inside makeApp is mock Database functions
const app = makeApp({
    getRecordsFromUserId
});

//Test Suite to verify record retrieval from database
describe("Get /record/getRecords/:userId",()=>{
    beforeEach(()=>{
        getRecordsFromUserId.mockReset()
    });

    test("Test for successful retrieval of records", async()=>{

        getRecordsFromUserId.mockResolvedValue(200)
        const response = await request(app).get("/record/getRecord/test");
        expect(getRecordsFromUserId.mock.calls.length).toBeLessThanOrEqual(1)
        expect(response.status).toBe(200);
    });

    //Should return a status Code of 404 for mismatched API endpoint
    test("Test for error while retrieval of records", async()=>{
        //Wrong API end point for failure of record retrieval
        const response = await request(app).get("/record/getRecords/test");
        expect(getRecordsFromUserId.mock.calls.length).toBeLessThanOrEqual(1)
        expect(response.status).toBe(404);
    });
})


