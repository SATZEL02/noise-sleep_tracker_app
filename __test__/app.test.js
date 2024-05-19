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