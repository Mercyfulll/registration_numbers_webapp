// export factory function 

export default function registrationNumber(){
    let platesArr = [];
    let registration = '';
    let regNumChar = '';
    let location = '';
    let msg = '';

   
   function validateRegNum(regNum){
    
       
       var char =  /^[cxjalCXJAL]{2}\s\d{3,6}$/
       var val = char.test(regNum)
       var firstChar = regNum.startsWith('c') || regNum.startsWith('C')
        
       if(val && firstChar){
         registration = regNum.toUpperCase()
       }

       return registration 
   }
   
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
           regPlate = plate;
       }
       if(town === "Capetown" && plate.startsWith('CA')){
           regPlate = plate
       }
       if (town === "Paarl" && plate.startsWith('CJ')){
            regPlate = plate
       }
       if (town === "Stellenbosch" && plate.startsWith('CL')){
            regPlate = plate
       }
       return plate
   }
    function reset(){
         platesArr = [];
         registration = '';
         regNumChar = '';
         location = ''
    }

   return{
           validateRegNum,
           regByTown,
           townName,
           reset,
           registrationCharacter,
   }
}
