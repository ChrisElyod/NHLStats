var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const axios = require('axios');
const cron = require("node-cron");

var indexRouter = require('./routes/index');
var gameDataRouter = require('./routes/teamData');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/getGameData', gameDataRouter)
app.use('/users', usersRouter);

cron.schedule('45 2 * * *', function() {
	axios.post('192.168.1.10:3000/getGameData')
		.then((res) => {
			console.log(res);
		}).catch((e) => {
			console.log(e);
		})
});

module.exports = app;
