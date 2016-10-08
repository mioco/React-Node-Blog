var express = require('express'),
	Post = require('../models/post.js'),
	router = express.Router();

/* GET home page. */

module.exports = function(app) {
	app.get('/', function(req, res, next) {
		var page = req.query.p ? parseInt(req.query.p) : 1;
	  Post.getSix(null, page, function(err, posts, total) {
	  	if (err) {  posts = [];}
	  	res.render('index', { 
	  	  title: 'オショのブログ' ,
	  	  posts: posts,
	  	  page: page,
	  	  isFirstPage: (page - 1) == 0,
	  	  isLastPage: ((page - 1) * 6 + posts.length) == total
	  	});
	  });	  
	});

	app.get('/article/:_id', function(req, res) {
		Post.getOne(req.params._id, function(err, post) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('article', {
				title: post.title,
				post: post,
				user: req.session.user,
				pv: post.pv
			});
		});
	});

	app.get('/tags', function(req, res) {
		Post.getTags(function(err, posts) {
			if (err) { return res.redirect('/');}
			res.render('tags', {
				title: 'Tags'
			});
		});
	});
	app.get('/users', function(req, res, next) {
	  res.send('respond with a resource');
	});
	app.get('/diary', function(req, res, next) {
	  res.render('diary', { title: '日常' });
	});
	app.get('/production', function(req, res, next) {
	  res.render('production', { title: '作品' });
	});
	app.get('/code', function(req, res, next) {
	  res.render('code', { title: '代码' });
	});
	app.get('/album', function(req, res, next) {
	  res.render('album', { title: '画册' });
	});
	app.get('/anime', function(req, res, next) {
	  res.render('anime', { title: '视频' });
	});
	app.get('/music', function(req, res, next) {
	  res.render('music', { title: '音乐' });
	});
	app.get('/about', function(req, res, next) {
	  res.render('about', { title: '关于' });
	});
	app.get('/links', function(req, res, next) {
	  res.render('link', { title: '链接' });
	});
}
