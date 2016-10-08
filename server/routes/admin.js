var crypto = require('crypto'),
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	express = require('express'),
	router = express.Router();

/* GET home page. */

module.exports = function(app) {
	//admin home page
	// app.get('/osyo1997', checkLogin);
	app.get('/osyo1997', function(req, res) {	
		res.render('admin', { title: '后台' });
	});

	//login post
	app.post('/osyoLogin', checkNotLogin);
	app.post('/osyoLogin', function(req, res) {
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.passwd).digest('hex');
		//is user exist
		User.get(req.body.name, function(err ,user) {
			if (!user) {
				req.flash('error', '你这个假司机！');
				return res.redirect('/osyoLogin');
			}
			//is password correct
			if (user.password != password) {
				req.flash('error', '熄火！');
				return res.redirect('/osyoLogin');
			}
			//input correct,set session
			req.session.user = user;
			req.flash('success', '发车成功')
			res.redirect('/osyo1997');
		})
	});

	//login page
	// app.get('/osyoLogin', checkNotLogin);
	app.get('/osyoLogin', function(req, res) {
		res.render('admin.login.ejs', {
			title: 'LOGIN',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	//logout
	// app.get('/logout', checkLogin);
	app.get('/logout', function(req, res) {
		req.session.user = null;
		res.redirect('./osyo1997');
	});

	//post article page
	// app.get('/post', checkLogin);
	app.get('/post', function(req, res) {
		res.render('admin.post.ejs', {
			title: 'POST',
			user: req.session.user
		})
	})

	//post edit page
	// app.post('/post', checkLogin);
	app.post('/post', function(req, res) {
		var currentUser = req.session.user,
			tags = req.body.tag,
			post = new Post(currentUser.name, req.body.title, req.body.post, tags);
		post.save(function(err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/osyo1997');
			}
			req.flash('success', '发布成功');
			res.redirect('osyo1997');
		});
	})

	//upload file
	// app.get('/upload', checkLogin);
	app.get('/upload', function(req, res) {
	  res.render('admin.upload.ejs', {
	  	user: req.session.user
	  })
	})

	// app.post('/upload', checkLogin);
	app.post('/upload', function(req, res) {
	  req.flash('success', '上传成功');
	  res.redirect('/upload');
	})

	//edit post
	// app.get('/edit/:_id', checkLogin);
	app.get('/edit/:_id', function(req, res) {
		Post.edit(req.params._id, function(err, post) {
			if (err) { return res.redirect('back');}
			res.render('admin.edit.ejs', {
				title: '编辑',
				post: post,
				user: req.session.user
			});
		});
	});

	// app.post('/edit/:_id', checkLogin);
	app.post('/edit/:_id', function(req, res) {
		Post.update(req.params._id, req.body.title, req.body.post, req.body.tags, function(err) {
			var url = encodeURI('/article/' + req.params._id);
			if (err) { return res.redirect(url);}
			req.flash('success', '修改成功');
			res.redirect(url);
		});
	})

	//remove
	// app.get('/remove/:_id', checkLogin);
	app.get('/remove/:_id', function(req, res) {
		Post.remove(req.params._id, function(err) {
			if (err) { return redirect('back');}
			res.redirect('/');
		});
	});

	function checkLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录');
			res.redirect('/osyoLogin');
		}
		next();
	}
	function checkNotLogin(req, res, next) {
		if (req.session.user) {
			req.flash('error', '已登录');
			res.redirect('back');
		}
		next();
	}

}