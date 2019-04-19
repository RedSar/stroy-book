const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
	res.send(
		'<p style="font-size:60px; text-align:center;">بسم الله الرحمان الرحيم</p>'
	);
});

port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`==> Server runnig on port ${port} ...`);
});
