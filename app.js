const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Config Passport --------------------------------------------------
require('./config/passport')(passport);
// -------------------------------------------------------------------

// LOAD ROUTES -------------------------------------------------------

const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

// -------------------------------------------------------------------

app.get('/', (req, res) => {
	res.send(
		'<p style="font-size:60px; text-align:center;">بسم الله الرحمان الرحيم</p>'
	);
});

port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`==> Server running on port ${port} ...`);
});
