const Realm=require('realm');
const { UUID } = Realm.BSON;

const index = (req,res)=>{
    res.send("Hello bets")
}

const getAllParties = async (req,res) => {
    const db = await require('../db/database');
    db.write(()=>{
        let parties=db.objects("Parties");
        res.status(200).json(parties);
    })
}



module.exports = {index,getAllParties}