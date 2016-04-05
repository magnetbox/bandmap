var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('map', { title: 'Map' });
});

/* GET home page. */
router.get('/albums', function(req, res) {
	var db = req.db;
	db.collection('albums').find().toArray(function (err, items) {
	    res.json(items);
	});
});

module.exports = router;
