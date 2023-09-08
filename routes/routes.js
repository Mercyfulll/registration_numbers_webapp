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
            let acceptedReg = reg.validateRegNum(registration)
            let rows = await data.duplicates(acceptedReg)

            if (rows.length > 0){
                req.flash('error', 'Entry already exists')
            }
            if(registration == ""){
                req.flash('error',"Empty entry please enter registration number") 
            }
            
            if (registration !== null && acceptedReg) {

                let townsIdObj = await data.getId(reg.registrationCharacter(registration))
                let townsId = townsIdObj.id;
    
                await data.Addregistration(reg.validateRegNum(registration),townsId)
              
            }else if(registration !== '' && !acceptedReg){
                req.flash('error',"Invalid input. Registrations allowed are from Capetown - CA , Stellensbosch- CL , Knysna - CX and Paarl - CJ.")
            }
    
            res.redirect("/")
    
            } catch(err){
                
                res.redirect("/")
            }
    }
    async function sorting(req,res){
      

        try{
            
            let selectValue = req.body.townSelect
            const townReg = await data.filterTowns(selectValue)
            
            if (selectValue && townReg.length <= 0) {
                 req.flash('info','No registrations under this town');
            } else{
                req.flash('info','');
               
            }

            res.render("index", { townReg, flash: req.flash('info') }); 
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

         req.flash('info', 'Database has been successfully cleared')
         
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