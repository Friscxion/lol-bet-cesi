const Realm=require('realm');
const { UUID } = Realm.BSON;

const index = (req,res)=>{
    res.send("Hello bets")
}

const getAllTeams = async (req,res) => {
    const db = await require('../db/database');
    db.write(()=>{
        let teams=db.objects("Teams");
        res.json(teams);
    })
}



module.exports = {index,getAllTeams}