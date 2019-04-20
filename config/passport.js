const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

// load User model:
const User = mongoose.model('users');

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: keys.googleClientID,
				clientSecret: keys.googleClientSecret,
				callbackURL: '/auth/google/callback',
				proxy: true // heroku ,it uses https protocol
			},
			(accessToken, refreshToken, profile, done) => {
				// console.log('accessToken', accessToken);
				// console.log('profile', profile);

				const newUser = {
					googleId: profile._json.sub,
					email: profile._json.email,
					firstName: profile._json.given_name,
					lastName: profile._json.family_name,
					image: profile._json.picture
				};

				// check for existing user:
				User.findOne({ googleId: profile.id }).then((user) => {
					if (user) {
						done(null, user);
					} else {
						new User(newUser).save().then((user) => {
							done(null, user);
						});
					}
				});
			}
		)
	);
	/*The user id (provided as the second argument of the done function)
 	is saved in the session and is later used to retrieve
  the whole object via the deserializeUser function.*/
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then((user) => {
			done(null, user);
		});
	});
};
