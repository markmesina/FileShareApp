const cors = require('cors');
const express = require('express');
const bp = require('body-parser');
const { connect } = require('mongoose');
const { success, error } = require('consola');
const passport = require('passport');


// bring in app constants
const { DB, PORT } = require('./config');

// initialize app
const app = express();

// set up middlewares
app.use(cors());
app.use(bp.json()); // with body-parser
app.use(passport.initialize());

require('./middlewares/passport')(passport);
// user router middleware
app.use('/api/users', require('./routes/users'));

const startApp = async () => {
  // create connection with db
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    })
    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    })
    // start listening for server on port
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );

  } catch (err) {
    error({
      message: `Unable to connect with the Database \n${err}`,
      badge: true
    })
  }
};
startApp();
