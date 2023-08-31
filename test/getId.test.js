import assert from 'assert';
import pgPromise from 'pg-promise';
import queries from '../services/database.js';
import registrationNumber from '../registration_numbers.js';



const pgp = pgPromise();

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'


const db = pgp(connectionString);

describe("The getId function test", async function(){
    let data = queries(db);

    beforeEach(async function(){
        // clean the tables before each test run
        await data.deleteAll()
    });

    it("It should get ID from prefix from town name", async function(){
        let reg = registrationNumber()
        let data = queries(db);
        let result = await data.getId('CX')
        let res = result.id

        assert.equal(2,res)
    })
})