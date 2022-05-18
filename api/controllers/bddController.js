const fs = require('fs');
const reset =async (req,res)=>{
    const db= await require('../db/database');
    db.close();

    fs.unlink("db/loldb.realm", function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });

    fs.copyFile("db/default/loldb.realm", "db/loldb.realm", (err) => {
        if (err) throw err;


        delete require.cache[require.resolve('../db/database')];
        require('../db/database');
        res.sendStatus(200);
    });
}
module.exports={reset}