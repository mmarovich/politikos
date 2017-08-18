// set up

const express = require('express');
const app = express();
// const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);
mongoose.Promise = global.Promise;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const {DATABASE_URL, TEST_DATABASE_URL } = require('./config/database.js');
var bcrypt = require('bcrypt-nodejs');

app.use(express.static(path.join(__dirname, 'public')));

// require('./config/passport')(passport)

// app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  name: 'Session',
  resave: true,
  saveUninitialized: true,
  secret: 'forty-two',
  store: new MongoStore({
    url: DATABASE_URL,
    autoReconnect: true
  })
}))
// app.use(passport.initialize());
// app.use(passport.session());

// API endpoints go here!

require('./routes/userRouter.js')(app);
require('./routes/repRouter.js')(app)

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});


let server;
function runServer(port = 3001, database = DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database, err => {
      if (err) {
        return reject(err);
      }
      // setUpNev();
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          console.log(`closeServer error, ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  });
};

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};

