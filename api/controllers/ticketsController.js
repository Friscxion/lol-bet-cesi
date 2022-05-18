const Realm=require('realm');
const CHOIX= require("../utils/choix");
const { UUID } = Realm.BSON;
const fetch = require('node-fetch');



const index = (req,res)=>{
    res.send("Hello tickets")
}

const getAllTickets = async (req,res) => {
    const db = await require('../db/database');
    let tickets
    db.write(()=>{
        tickets=db.objects("Tickets");
    });
    tickets=await Promise.all(tickets.map(async(ticket)=>{
        ticket=JSON.parse(JSON.stringify(ticket));
        let bets=await fetch("http://localhost:3002/bets/id/"+ticket._id);
        bets=await bets.json();
        return {...ticket,bets:bets}
    }))
    res.json(tickets);
}

const newTickets = async (req,res) => {
    const db = await require('../db/database');
    let {party_id,bet,pronostic}=req.body;
    bet=parseInt(bet);
    let potential_gain=await calculPotentialGain(party_id,pronostic,bet);
    let ticket;
    db.write(()=>{
        ticket=db.create("Tickets",{_id:new UUID,date:Date.now()+"",bet:bet,potential_gain:potential_gain})
        res.sendStatus(200);
    })

    await fetch("http://localhost:3002/bets",{
        method:"PUT",
        body:JSON.stringify({
            party_id:party_id,
            ticket_id:ticket._id,
            pronostic:pronostic,
            potential_gain:potential_gain
        }),
        headers:{
            "Content-Type":"application/json"
        }
    });
}

const calculPotentialGain = async (party_id,pronostic,bet) => {
    const db = await require('../db/database');
    let party;
    db.write(()=>{
        party=db.objectForPrimaryKey("Parties",new UUID(party_id));
    });
    let ratio;
    if(pronostic===CHOIX.HOMEWIN)ratio=party.home_team_rating;
    else if(pronostic===CHOIX.AWAYWIN)ratio=party.away_team_rating;
    else ratio=party.draft_rating;
    let potential_gain=parseFloat(bet)*parseFloat(ratio);
    return potential_gain;
}



module.exports = {index,getAllTickets,newTickets}