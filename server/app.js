
const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
require('./src/database/connection');

// set up port
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());//recognize the incoming request object as JSON Object
app.use(bodyParser.urlencoded({extended:false}))


app.use(cors());

// add routes
const registerRouter = require('./src/routes/userRouter/register.js');
const loginRouter = require('./src/routes/userRouter/login.js');
app.use(registerRouter);
app.use(loginRouter);


// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));