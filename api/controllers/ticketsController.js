const Realm=require('realm');
const { UUID } = Realm.BSON;

const index = (req,res)=>{
    res.send("Hello tickets")
}

const getAllTickets = async (req,res) => {
    const db = await require('../db/database');
    db.write(()=>{
        let tickets=db.objects("Tickets");
        res.json(tickets);
    })
}



module.exports = {index,getAllParties}