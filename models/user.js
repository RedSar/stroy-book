const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: { type: String, required: true },
	email: { type: String, required: true },
	firstName: String,
	lastName: String,
	image: String
});

mongoose.model('users', userSchema);
