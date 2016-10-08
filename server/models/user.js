var mongodb = require('./db');

function User(user) {
	this.username = user.username;
	this.password = user.password;
	//this.address = user.address;
};

module.exports = User;

//user information
User.prototype.save = function(callback) {
	//use database
	var user = {
		name: this.name,
		password: this.password,
		//address: this.address
	};
	//connect database
	mongodb.open(function (err, db) {
		if (err) {	return callback(err);}
		//user list
		db.collection('user', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//insert user information
			collection.insert(user, {safe: true}, function (err, user) {
				mongodb.close();
				if (err) {  return callback(err);}
				callback(null ,user[0]);
			});
		});
	});
};

//read user information
User.get = function(name, callback) {
	//connect database
	mongodb.open (function(err, db) {
		if (err) {  return callback(err);}
		//user list
		db.collection('user', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//serch username
			collection.findOne({owner: name}, function(err, user) {
				mongodb.close();
				if (err) {  return callback(err);}
				callback(null, user);
			});
		});
	});
}