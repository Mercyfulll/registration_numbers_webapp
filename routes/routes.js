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
    // } else if (rows.length > 0) {
    //     duplicateExists = true; // Set the duplicateExists variable to true
    //     if (duplicateExists) {
    //         req.flash('error', 'Entry already exists');
    //         duplicateExists = false
    //     }
    //     return res.direct("/")
    // async function functionality(req, res) {
        
    //         let registration = req.body.regiNumber;
    //         let acceptedReg = reg.validateRegNum(registration);

    //         // let rows = await data.duplicates(acceptedReg);
    
    //         if (registration == "") {
    //             req.flash('error', "Empty entry, please enter a registration number"); 
    //             res.redirect("/")
    //         }
    
    //         else if (acceptedReg === "") {
    //             console.log(acceptedReg)
    //             req.flash('error', "Invalid input. Registrations allowed are from Capetown - CA , Stellensbosch- CL , Knysna - CX and Paarl - CJ.");
    //             res.redirect("/")
    //         // if (registration !== null && acceptedReg){

    //         // }
    //         } else if(acceptedReg !== ''){
                
    //             acceptedReg = ""
    //              try{
    //                 let townsIdObj = await data.getId(reg.registrationCharacter(registration));
    //                 let townsId = townsIdObj.id;
    //                 await data.Addregistration(reg.validateRegNum(registration), townsId);
    //                 res.redirect("/")
    //             }
    //             catch (err) {
    //                 acceptedReg = ""
    //                 console.log(err.message)
    //                 if(err.message.includes("duplicate key")){
    //                     req.flash('error', 'Entry already exists')
    //                     res.redirect("/")
    //                 }
    //                 // req.flash('error', 'Entry already exists')
    //                 // res.redirect("/");
    //             }
    //         }
    
    //         // res.redirect("/");
        
    // }

    
    async function functionality(req,res){
        try{
            
              
            let registration = req.body.regiNumber
            console.log(registration)
            let acceptedReg = reg.validateRegNum(registration)
            let rows = await data.duplicates(acceptedReg)
            // let errors = reg.errorMessages(registration)

            if(!acceptedReg){
                req.flash('error',"Invalid input. Registrations allowed are from Capetown - CA , Stellensbosch- CL , Knysna - CX and Paarl - CJ.")
            }
            else if(registration === ''){
                req.flash('error',"Empty entry please enter registration number") 
            }
            // else if(errors){
            //     req.flash('error',errors)
            // }
            else if (rows.length > 0){
                req.flash('error', "Entry already exists")
                
            }
            else if (registration !== null && acceptedReg) {

                let townsIdObj = await data.getId(reg.registrationCharacter(registration))
                let townsId = townsIdObj.id;
    
                await data.Addregistration(reg.validateRegNum(registration),townsId)
              
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
    async function showOneRegistration(req,res){
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
        sorting,
        functionality,
        home,
        showOneRegistration
     }
}