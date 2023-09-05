export default function routes(data, reg){

    async function home(req,res){
        try{

        let townReg = await data.getTowns()
        // Send http response 
        res.render("index", {townReg})
    
        }catch(err){
            console.log("info","Something went wrong")
        }
    }
    async function functionality(req,res){
        try{
            
            let registration = req.body.regiNumber
            let firstChar =  registration.startsWith('C') || registration.startsWith('c')

            if(registration == ""){

                req.flash('error',"Empty entry please enter registration number") 

            }else if (registration !== reg.validateRegNum(registration)){

                req.flash('error',"Invalid input enter two characters, press space then 3-6 digits. Registrations allowed are from Capetown - CA , Stellensbosch- CL , Knysna - CX and Paarl - CJ. Only Upper cases are allowed.")
            }
            else {

                let townsIdObj = await data.getId(reg.registrationCharacter(registration))
                let townsId = townsIdObj.id;
                
                await data.Addregistration(reg.validateRegNum(registration),townsId)
            }
            res.redirect("/")
    
            } catch(err){
                console.log("Something went wrong");
            }
    }
    async function sorting(req,res){

        try{
    
        let selectValue = req.body.townSelect
       
        let townReg = await data.filterTowns(selectValue)
        res.render("index",{townReg})
    
        }catch(err){
            console.log("Something went wrong");
        }
        
    }
    async function one(req,res){
        try{
        let regNumber = req.params.regNum
       
    
        res.render("registration", {regNumber})
        }catch(err){
            console.log("Something went wrong");
        }
    }
    async function clear(req,res){
        try{
         reg.reset()
    
         await data.deleteAll()
         
         res.redirect("/")
         }catch(err){
             console.log("Something went wrong");
         }
         
     }
     return{
        clear,
        one,
        sorting,
        functionality,
        home
     }
}