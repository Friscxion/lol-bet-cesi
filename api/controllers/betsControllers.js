const Realm=require('realm');
const { UUID } = Realm.BSON;

const index = (req,res)=>{
    res.send("Hello bets")
}

const createBets = async (req,res) => {
    const db = await require('../db/database');
    const {party_id,ticket_id,pronostic,potential_gain}=req.body;
    if(!party_id||!ticket_id||!pronostic||!potential_gain)return res.sendStatus(404);
    db.write(()=>{
        let bet=db.create("Bets",{_id:new UUID(),party_id:party_id,ticket_id:ticket_id,pronostic:pronostic,potential_gain:potential_gain})
        res.status(200).send({bet_id:bet._id});
    });
}
const getBetsByTicketId = async (req,res)=>{
    let bets;
    const db = await require('../db/database');
    db.write(()=>{
       bets=db.objects("Bets").filtered("ticket_id=$0",req.params.id);
    });
    res.send(JSON.parse(JSON.stringify(bets)))
}

module.exports = {index,createBets,getBetsByTicketId}