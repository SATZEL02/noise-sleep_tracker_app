import request from 'supertest';
import makeApp from '../app.js';

const getRecordFromRecordId = jest.fn();
const deleteRecordById = jest.fn();

//Argument inside makeApp is mock Database functions
const app = makeApp({
    getRecordFromRecordId,
    deleteRecordById
});
//Test Suite to verify record deletion from database
describe("Delete /record/deleteRecord/:recordId",()=>{
    beforeEach(()=>{
        getRecordFromRecordId.mockReset()
        deleteRecordById.mockReset()
    });

    //Test to check if functions are called only once
    test("Test for count of function calls", async()=>{
        await request(app).delete("/record/deleteRecord/record1");
        expect(getRecordFromRecordId.mock.calls.length).toBe(1)
        expect(deleteRecordById.mock.calls.length).toBe(1)
    });

    //Test to verify successful deletion of records
    test("Test for verifying record deletion", async()=>{
        getRecordFromRecordId.mockResolvedValue(true);
        deleteRecordById.mockResolvedValue({status:200})
        const response = await request(app).delete("/record/deleteRecord/record1");
        expect(response.status).toBe(200);
    });

    //Test to verify in case no record is found
    test("Test in case no record is found for given record id",async()=>{
        getRecordFromRecordId.mockResolvedValue(false);
        const response = await request(app).delete("/record/deleteRecord/record1");
        expect(getRecordFromRecordId.mock.calls.length).toBe(1)
        expect(deleteRecordById.mock.calls.length).toBe(0)
        expect(response.status).toBe(401)
    })
})


