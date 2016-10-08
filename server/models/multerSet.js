var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/images/post');
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now());
	}
});

var upload = multer({ storage: storage}).array('postImg', 10);
exports.dataInput = function(req, res) {
	upload(req, res, function(err) {
		console.log('is running');
		if (err) { return console.log(err);}
		return res.redirect('/upload');
	})
}