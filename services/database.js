export default  function queries(db){

    async function Addregistration(regNum,id){
        try{
            await db.none('INSERT INTO registration_numbers (reg_num, towns_id) VALUES($1,$2)',[regNum,id]);  
        }
        catch(err){
            console.log(err)
        }
    }  
    
    async function getId(charStart){
        return await db.oneOrNone('SELECT id FROM towns WHERE reg_num_start = $1',[charStart]);
    }
    async function filterTowns(town){
        return await db.manyOrNone("SELECT registration_numbers.reg_num FROM registration_numbers JOIN towns ON registration_numbers.towns_id = towns.id WHERE town_name = $1",[town]);
    }
    async function getTowns(){
        return await db.manyOrNone("SELECT registration_numbers.reg_num FROM registration_numbers JOIN towns ON registration_numbers.towns_id = towns.id")
    }
    async function deleteAll(){
        await db.none("DELETE FROM registration_numbers")
    }
    async function duplicates(entry){
       return await db.manyOrNone(' SELECT * FROM registration_numbers WHERE reg_num = $1',[entry])
    }
    return {
        getId,
        deleteAll,
        filterTowns,
        getTowns,
        Addregistration,
        duplicates
    }
} 