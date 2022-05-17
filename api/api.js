const express = require('express')
const cors = require('cors');
const app = express()
const port = 3002;
app.use(cors());
const indexRouter = require('./routes/index');
const betsRouter = require('./routes/bets');
const partiesRouter = require('./routes/parties');
const teamsRouter = require('./routes/teams');
const ticketsRouter = require('./routes/tickets');

app.use('/',indexRouter);
app.use('/bets',betsRouter);
app.use('/parties',partiesRouter);
app.use('/teams',teamsRouter);
app.use('/tickets', ticketsRouter);

app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})