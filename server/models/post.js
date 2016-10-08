var mongodb = require('./db'),
		mgdb = require('mongodb'),
	markdown = require('markdown').markdown;

function Post(name, title, post, tags) {
	this.name = name;
	this.title = title;
	this.post = post;
	this.tags = tags;
	console.log(tags);
}
module.exports = Post;

Post.prototype.save = function(callback) {
	var date = new Date();
	//time format
	var time = {
		date: date,
		year: date.getFullYear(),
		month: date.getFullYear() + '-' + (date.getMonth() + 1),
		day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
		minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() +  ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
	}
	var post = {
		time: time,
		title: this.title,
		post: this.post,
		tags: this.tags,
		pv: 0
	};
	//open database
	mongodb.open(function(err, db) {
		if(err) {  return callback(err);}
		db.collection('posts', function(err, collection) {
			if(err) {
				mongodb.close();
				return callback;
			}
			collection.insert(post, {safe: true}, function(err) {
				mongodb.close();
				if(err) {  return callback(err);}
				callback(null);
			});
		});
	});
};
//post list
Post.getSix = function(date, page, callback) {
	mongodb.open(function(err, db) {
		if (err) {  return callback(err);}
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if(date) {
				query.time = date;
			}
			//return page count
			collection.count(query, function(err, total) {
				collection.find(query, {
					skip: (page - 1)*6,
					limit: 6
				}).sort({time: -1}).toArray(function(err, docs) {
					mongodb.close();
					if (err) {  return callback(err);}
					//parsing the markdown to HTML
					docs.forEach(function(doc) {
						doc.post = markdown.toHTML(doc.post);
					});
					callback(null, docs, total);
				});
			});			
		});
	});
};
//post list
Post.getOne = function(_id, callback) {
	mongodb.open(function(err, db) {
		if (err) {  return callback(err);}
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				'_id': mgdb.ObjectID.createFromHexString(_id) 
			},function(err, doc) {			
				if (err) {  
					mongodb.close();
					return callback(err);}
				if (doc) {
					collection.update({'_id': mgdb.ObjectID.createFromHexString(_id)},{
						$inc: {'pv': 1}
					}, function(err) {
						mongodb.close();
						if (err) { return callback(err);}
					});
					//parsing the markdown to HTML
					doc.post = markdown.toHTML(doc.post);
					callback(null, doc);
				}
			});
		});
	});
};

//edit post return page
Post.edit = function(_id, cb) {
	mongodb.open(function(err, db) {
		if (err) { return cb(err);}
		db.collection('posts', function(err, collection) {
			if (err) { 
				mongodb.close();
				return cb(err);
			}
			collection.findOne({
				'_id': mgdb.ObjectID.createFromHexString(_id)
			},function(err, doc) {
				mongodb.close();
				if (err) { return cb(err);}
				cb(null, doc);
			});
		});
	});
};

//edit post update
Post.update = function(_id, title, post, tags,cb) {
	mongodb.open(function(err, db) {
		if (err) { return cb(err);}
		db.collection('posts', function(err, collection) {
	console.log(_id, title,post,tags)
			if (err) {
				mongodb.close();
				return cb(err);
			}
			collection.update({'_id': mgdb.ObjectID.createFromHexString(_id)}, {
				$set: {
					post:post,
					title: title,
					tags: tags
				}
			}, function(err) {
				mongodb.close();
				if(err) { return cb(err)};
				cb(null)
			});
		});
	});
}

//delete
Post.remove = function(_id, cb) {
	mongodb.open(function(err, db) {
		if (err) { return cb(err);}
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return cb(err);
			}
			collection.remove({
				'_id': mgdb.ObjectID.createFromHexString(_id)
			},{w: 1}, function(err) {
				mongodb.close();
				if (err) { return cb(err);}
				cb(null);
			});
		});
	});
}