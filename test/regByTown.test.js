import assert from 'assert';
import registrationNumber from '../registration_numbers.js';

describe("The regByTown function test",function(){

    it("It should return CX registration if plate starts with CX and town is Knysna ", function(){

        let reg = registrationNumber()
        reg.regByTown('Knysna','CX 1234')

        assert.equal('CX 1234',reg.regByTown('Knysna','CX 1234'))
    })
    it("It should return CA registration if plate starts with CA and town is Capetown", function(){

        let reg = registrationNumber()
        reg.regByTown('Capetwown','CA 3435')

        assert.equal('CA 3435',reg.regByTown('Capetwown','CA 3435'))
    })
    it("It should return CJ registration if plate starts with CJ and town is Paarl", function(){

        let reg = registrationNumber()
        reg.regByTown('Paarl','CJ 4110')

        assert.equal('CJ 4110',reg.regByTown('Paarl','CJ 4110'))
    })
    it("It should return CL registration if plate starts with CL and town is Stellenbosch", function(){

        let reg = registrationNumber()
        reg.regByTown('Stellenbosch','CL 3200')

        assert.equal('CL 3200',reg.regByTown('Stellenbosch','CL 3200'))
    })
})