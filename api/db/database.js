const Realm =  require("realm");

const Bets = {
    name: "Bets",
    properties: {
        _id: "uuid",
        party_id: "string",
        ticket_id: "string",
        pronostic: "string?",
        potential_gain:"float?",
        result:"string?"
    },
    primaryKey:"_id"
};

const Parties = {
    name: "Parties",
    properties: {
        _id: "uuid",
        home_team: "string",
        away_team: "string",
        score_home_team: "int?",
        score_away_team: "int?",
        home_team_rating:"float?",
        away_team_rating:"float?",
        draft_rating:"float?",
        result:"string?",
        date:"string?"
    },
    primaryKey:"_id"
};

const Teams = {
    name: "Teams",
    properties: {
        _id: "uuid",
        name: "string",
    },
    primaryKey:"_id"
};

const Tickets = {
    name: "Tickets",
    properties: {
        _id: "uuid",
        date: "string?",
        result: "string?",
        bet: "float?",
        potential_gain: "float?",
    },
    primaryKey:"_id"
};

// open a local realm with the 'Cat' schema
async function db (){
    const realm = await Realm.open({
        schema: [Bets,Teams,Tickets,Parties],
        path:"/db/loldb.realm"
    });
    return realm;
}


module.exports={db}