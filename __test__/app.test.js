import request from 'supertest';
import makeApp from '../app.js';

const createRecord = jest.fn();
const getRecordFromRecordId = jest.fn();
const getRecordsFromUserId = jest.fn();
const deleteRecordById = jest.fn();

//Argument inside makeApp is mock Database functions
const app = makeApp({
    createRecord,
    getRecordFromRecordId,
    getRecordsFromUserId,
    deleteRecordById
});

//Test Suite to check API connection
describe("Establish API connection (GET /)", ()=>{
    test("Should response with 201 status code",async ()=>{
        const response = await request(app).get("/");
        expect(response.status).toBe(201);
    });
    test("Should specify json in content type header",async ()=>{
        const response = await request(app).get("/");
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});

describe("POST /record/sleep", ()=>{

    beforeEach(()=>{
        createRecord.mockReset()
    });

    
    //Test for checking successfully calling database query 
    test("Should save the userId and hours in the database",async()=>{
        const bodyData = [
            {userId: "test1", hours:1},
            {userId: "test2", hours:2},
            {userId: "test3", hours:3}
        ]
        for(const body of bodyData){
            createRecord.mockReset();
            await request(app).post("/record/sleep").send(body)
            expect(createRecord.mock.calls.length).toBe(1);
            expect(createRecord.mock.calls[0][0]).toBe(body.userId)
            expect(createRecord.mock.calls[0][1]).toBe(body.hours)
        }
    });

    //Test for successful record submission and Record Id retrieval
    test("should responsd with a json object containing record id", async()=>{
        for(let i = 0;i<10;i++){
            createRecord.mockReset();
            createRecord.mockResolvedValue({_id:i});
            const response = await request(app).post("/record/sleep").send({userId:"userId",hours:4})
            expect(response.body.recordId).toBe(i);
        }
    });

    //Test for error handling while record submission
    test("should respond with status Code 40* for invalid arguments", async()=>{
        const bodyData = [
            {userId: "test1", hours:"wrong format"},
            {userId: 3, hours:3},
            {userId:"test"}
        ]
        for(const body of bodyData){
            createRecord.mockReset();
            const response = await request(app).post("/record/sleep").send(body)
            expect(createRecord.mock.calls.length).toBeLessThanOrEqual(1);
            expect(response.body.status).not.toBe(200)
            expect(response.body.success).toBe(false)
        }
    })

});

