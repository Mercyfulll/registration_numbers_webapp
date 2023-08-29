// export factory function 

export default function registrationNumber(){
    let platesArr = [];
    let registration = '';
    let regNumChar = '';
    let location = '';

   
   function validateRegNum(regNum){

       var char = /^[cxjalCXJAL\s0-9]*$/i
       var val = char.test(regNum)
       var firstChar = regNum.startsWith('c') || regNum.startsWith('C')
       if(val && firstChar){
         registration = regNum.toUpperCase()
       }
       return registration
   }
   function getValidatedRegNum(){
        return registration
   }


   function limitTown(regNum){
       var reg = regNum.startsWith('C')
       if(!reg){
           return "Only enter registration from Paarl, Stellenbosch,Cape Town and George"
       }            
   }
//    function handlingErrors(regNum){
//         var char = /^[cxjalCXJAL\s0-9]*$/i
//         var val = char.test(regNum)
//         if (regNum === ''){
//             return "Empty entry please enter registration number"
//         }else if (regNum !== val){
//             return "Invalid registration"
//         } 
//     }
//    function errorMessages2(){
//     let reg = regNum.startsWith('C') || regNum.startsWith('c')
//     if (!reg){
//         return "Please enter valid registration number"
//     }else
//    }
   function registrationCharacter(rNum){
        let regiNum = rNum.toUpperCase() 
        if(regiNum.startsWith('CA')){
            regNumChar = 'CA'
        }else if(regiNum.startsWith('CX')){
            regNumChar = 'CX'
        }else if(regiNum.startsWith('CJ')){
            regNumChar = 'CJ'
        }else if(regiNum.startsWith('CL')){
            regNumChar = 'CL'
        }
            return regNumChar
   }
   function townName(rNum){
    let regiNum = rNum.toUpperCase()
    if(regiNum.startsWith('CX')){
        location = 'Knysna'
    }else if(regiNum.startsWith('CA')){
        location = 'Capetown'
    }else if(regiNum.startsWith('CJ')){
        location = 'Paarl'
    }else if(regiNum.startsWith('CL')){
        location = 'Stellenbosch'
    }
        return location
}

   function regByTown(townPlate, regPlate){
       var town = townPlate.toLowerCase()
       var plate = regPlate.toUpperCase()
       if(town === "Knysna" &&  plate.startsWith('CX')){
           return plate;
       }
       if(town === "Capetown" && plate.startsWith('CA')){
           return plate
       }
       if (town === "Paarl" && plate.startsWith('CJ')){
           return plate
       }
       if (town === "Stellenbosch" && plate.startsWith('CL')){
           return plate
       }else {
           return ''
       }
   }
   function regPlates(regNum){
       platesArr.push(regNum)
    }
   function getPlates(){
       return platesArr
    }
    function reset(){
         platesArr = [];
         registration = '';
         regNumChar = '';
         location = ''
    }

   return{
           validateRegNum,
           limitTown,
           regByTown,
           regPlates,
           getPlates,
           townName,
           reset,
        //    handlingErrors,
           getValidatedRegNum,
           registrationCharacter,
   }
}

let x = registrationNumber()
console.log(x.registrationCharacter('Ca 1234'))
console.log(x.townName('capeTown'))
