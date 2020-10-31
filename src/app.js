const express      = require("express");
const cors         = require("cors");

const Routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(Routes);

module.exports = app;