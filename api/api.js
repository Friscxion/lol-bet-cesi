const express = require('express')
const app = express()
const port = 3002;

const indexRouter = require('./routes/index');
const betsRouter = require('./routes/bets');
const partiesRouter = require('./routes/parties');
const teamsRouter = require('./routes/teams');
const ticketsRouter = require('./routes/tickets');
const {db} = require("./db/database");

app.use('/',indexRouter);
app.use('/bets',betsRouter);
app.use('/parties',partiesRouter);
app.use('/teams',teamsRouter);
app.use('/tickets', ticketsRouter);

app.use(express.json());
db()
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})