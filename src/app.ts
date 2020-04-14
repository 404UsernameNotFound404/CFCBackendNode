import express from 'express';
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const initDB = require('./db').initDB;

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var corsOptions = {
    exposedHeaders: ['Content-Type', 'Authorization', 'Institution-Id', "Origin", "X-Requested-With", "Content-Type", "Accept"]
}

app.use(cors(corsOptions));

app.use('/user', require('./user/userRouter'));
app.use('/activist', require('./actvist/activistRouter'));
app.use('/organization', require('./organization/organizationRouter'));
app.use('/', async (req: express.Request, res: express.Response) => {
    res.json({ message: "Working" })
});

const startApp = async () => {
    await initDB();
    app.listen(process.env.PORT, function () {
        console.log('Server is listening on port ' + process.env.PORT);
    });
}

startApp();
