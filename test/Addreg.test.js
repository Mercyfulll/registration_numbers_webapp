import assert from 'assert';
import pgPromise from 'pg-promise';
import queries from '../services/database.js';
import registrationNumber from '../registration_numbers.js';



const pgp = pgPromise();

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'


const db = pgp(connectionString);




describe('The Addregistration query test', async function(){
    let data = queries(db);

    beforeEach(async function(){
        // clean the tables before each test run
        await data.deleteAll()
    });

    it("It should insert registration number and town id to the table if valid", async function(){
        let reg = registrationNumber()
        let data = queries(db);

        let townsIdObj = await data.getId(reg.registrationCharacter("CA 4539"));
        let townsId = townsIdObj.id;
        let plate = reg.validateRegNum("CA 4539");
        await data.Addregistration(plate ,townsId);


        assert.deepEqual([
            {
              reg_num: 'CA 4539'
            }
          ],
          await data.getTowns())
    })

    it("It should be null registration number if registration number is invalid", async function(){
        let reg = registrationNumber()
        let data = queries(db);

        let townsIdObj = await data.getId(reg.registrationCharacter("CA2223"));
        let townsId = townsIdObj.id;
        let plate = reg.validateRegNum("CA2223");
        await data.Addregistration(plate ,townsId);


        assert.deepEqual([
            {
              reg_num: ''
            }
          ]
          ,await data.getTowns())
    })
})