const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
// Load Models:------------------------------------------------------
require('./models/user');
// -------------------------------------------------------------------

// Config Passport --------------------------------------------------
require('./config/passport')(passport);
// -------------------------------------------------------------------

// LOAD ROUTES -------------------------------------------------------
const authRoutes = require('./routes/auth');
// -------------------------------------------------------------------

// config MongoDB:----------------------------------------------------
keys = require('./config/keys');
mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => {
		console.log('==> Database connected ... OK');
	})
	.catch((err) => console.log(err));
// -------------------------------------------------------------------

//------------------ MIDDLEWARES--------------------------------------
app.use(cookieParser());
app.use(
	session({
		secret: 'My litelle secret',
		resave: false,
		saveUninitialized: true
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Global variables :
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});
// -------------------------------------------------------------------

//------------------ ROUTES------------------------------------------
app.get('/', (req, res) => {
	res.send(
		'<p style="font-size:60px; text-align:center;">بسم الله الرحمان الرحيم</p>'
	);
});

app.use('/auth', authRoutes);
/*_________________________________________________________________*/

port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`==> Server running on port ${port} ... OK`);
});
