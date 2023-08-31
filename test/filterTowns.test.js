import assert from 'assert';
import pgPromise from 'pg-promise';
import queries from '../services/database.js';
import registrationNumber from '../registration_numbers.js';



const pgp = pgPromise();

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'


const db = pgp(connectionString);



describe("The filterTowns function test", function (){
    let data = queries(db);

    beforeEach(async function(){
        // clean the tables before each test run
        await data.deleteAll()
    });
    it("It should filter towns from Cape town", async function(){
        let reg = registrationNumber()
        let data = queries(db);

    
        await data.Addregistration(reg.validateRegNum('CA 1460'),1);
        await data.Addregistration(reg.validateRegNum('CX 8764'),2);
        let tab = await data.getTowns()
        
        assert.deepEqual([
            {
              reg_num: 'CA 1460'
            }
          ]
          ,await data.filterTowns("Capetown"))

    })
    it("It should filter towns from Paarl", async function(){
        let reg = registrationNumber()
        let data = queries(db);

    
        await data.Addregistration(reg.validateRegNum('CA 1460'),1);
        await data.Addregistration(reg.validateRegNum('CX 8764'),2);
        await data.Addregistration(reg.validateRegNum('CJ 8554'),3);
        await data.Addregistration(reg.validateRegNum('CJ 7777'),3);
        await data.Addregistration(reg.validateRegNum('CJ 4990'),3);
        await data.Addregistration(reg.validateRegNum('CL 152638'),4);
        let tab = await data.getTowns()
        
        assert.deepEqual([
            {
              reg_num: 'CJ 8554'
            },
            {
              reg_num: 'CJ 7777'
            },
            {
              reg_num: 'CJ 4990'
            }
          ]
          ,await data.filterTowns("Paarl"))

    })
    it("It should filter towns from Stellenbosch", async function(){
        let reg = registrationNumber()
        let data = queries(db);

    
        await data.Addregistration(reg.validateRegNum('CA 1460'),1);
        await data.Addregistration(reg.validateRegNum('CX 8764'),2);
        await data.Addregistration(reg.validateRegNum('CJ 8554'),3);
        await data.Addregistration(reg.validateRegNum('CJ 7777'),3);
        await data.Addregistration(reg.validateRegNum('CJ 4990'),3);
        await data.Addregistration(reg.validateRegNum('CL 152638'),4);
        let tab = await data.getTowns()
        
        assert.deepEqual([
            {
              reg_num: 'CL 152638'
            }
          ],
          await data.filterTowns("Stellenbosch"))

    })
    it("It should filter towns from Knysna", async function(){
        let reg = registrationNumber()
        let data = queries(db);

    
        await data.Addregistration(reg.validateRegNum('CA 1460'),1);
        await data.Addregistration(reg.validateRegNum('CX 8764'),2);
        await data.Addregistration(reg.validateRegNum('CJ 8554'),3);
        await data.Addregistration(reg.validateRegNum('CJ 7777'),3);
        await data.Addregistration(reg.validateRegNum('CJ 4990'),3);
        await data.Addregistration(reg.validateRegNum('CL 152638'),4);
        let tab = await data.getTowns()
        
        assert.deepEqual([
            {
              reg_num: 'CX 8764'
            }
          ]
          ,
          await data.filterTowns("Knysna"))

    })
})
