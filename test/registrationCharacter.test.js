import assert from 'assert';
import registrationNumber from '../registration_numbers.js';

describe("The registrationCharacter test",function(){

    it("It should return CA if registration is from Capetown", function(){

        let reg = registrationNumber()
        reg.registrationCharacter("CA 1234")

        assert.equal('CA',reg.registrationCharacter('CA 1234'))
    })
    it("It should return CX if registration is from Knysna", function(){

        let reg = registrationNumber()
        reg.registrationCharacter("Cx 4443")

        assert.equal('CX',reg.registrationCharacter('Cx 4443'))
    })
    it("It should return CL if registration is from Stellenbosch", function(){

        let reg = registrationNumber()
        reg.registrationCharacter("CL 6223")

        assert.equal('CL',reg.registrationCharacter('CL 6223'))
    })
    it("It should return CJ if registration is from Paarl", function(){

        let reg = registrationNumber()
        reg.registrationCharacter("CJ 7122")

        assert.equal('CJ',reg.registrationCharacter('CJ 7122'))
    })
    it("It should return null if registration entered is not valid", function(){

        let reg = registrationNumber()
        reg.registrationCharacter("Af 9090")

        assert.equal('',reg.registrationCharacter('Af 9090'))
    })
})