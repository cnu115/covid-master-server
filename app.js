const express = require('express');
const db = require('./database/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const UserRouter = require('./routes/UserRouter');
const PlayerRouter = require('./routes/PlayerRoutes');

const { default: axios } = require('axios');

const app = express();

app.use(cookieParser())

app.get("/hello", (req, res, next) => {
  console.info("hello call success");
  res.send("Welcome to covid master");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.use('/user', UserRouter);
app.use('/player', PlayerRouter);


app.listen(process.env.PORT || 5000, function(res){
    console.log('connected successfully port 5000')
});