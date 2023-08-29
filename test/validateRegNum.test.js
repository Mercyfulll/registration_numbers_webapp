import assert from 'assert';
import registrationNumber from '../registration_numbers.js';

describe("The validateRegNum function", function(){
    it("It should check if Registration number is valid and return null if false", function(){

        let reg = registrationNumber()
        reg.validateRegNum("Xs 1234")

        assert.equal('',reg.getValidatedRegNum())
    }) 

    it("It should check if Registration number is valid and return it if true", function(){

        let reg = registrationNumber()
        reg.validateRegNum("Ca 1234")

        assert.equal('CA 1234',reg.getValidatedRegNum())
    }) 
    it("It should check if Registration number starts with c and return it if true", function(){

        let reg = registrationNumber()
        reg.validateRegNum("CL 9886")

        assert.equal('CL 9886',reg.getValidatedRegNum())
    }) 
    it("It should check if Registration number starts with c and return null if false", function(){

        let reg = registrationNumber()
        reg.validateRegNum("Lc 9886")

        assert.equal('',reg.getValidatedRegNum())
    })

})