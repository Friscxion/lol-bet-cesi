const Realm=require('realm');
const { UUID } = Realm.BSON;

const index = (req,res)=>{
    res.send("Hello bets")
}

const createBets = async (req,res) => {
    const db = await require('../db/database');
    const {party_id,ticket_id,pronostic}=req.body;
    db.write(()=>{
        db.create("Bets",{_id:new UUID(),party_id:party_id,ticket_id:ticket_id,pronostic:pronostic})
    })
}

const updateBets = (req,res) => {

}

const deleteBets = (req,res) => {

}

module.exports = {index,createBets,updateBets,deleteBets}