var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

/* POST album form data */
router.post('/addalbum', function(req, res) {
    var bandName = req.param('bandname');
    var bandLocation = req.param('bandlocation');
    var bandLatitude = req.param('bandlatitude');
    var bandLongitude = req.param('bandlongitude');
    var albumName = req.param('albumname');
    var albumYear = req.param('albumyear');
    var albumMonth = req.param('albummonth');
    var albumSales = req.param('albumsales');
    var albumLocation = req.param('albumlocation');
    var albumLatitude = req.param('albumlatitude');
    var albumLongitude = req.param('albumlongitude');

    var bandID = bandName.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    var bandLocationID = bandLocation.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    var albumLocationID = albumLocation.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    var locationID;

    var db = req.db;
    var bands = db.collection('bands');
    var albums = db.collection('albums');
    var locations = db.collection('locations');


    if (bandLocation) {
        locationID = bandLocationID
        locations.insert({
            "_id": bandLocationID,
            "name": bandLocation,
            "latitude": bandLatitude,
            "longitude": bandLongitude
        }, function (err, doc) {
            if (err) {
                console.log("db error: band location")
            }
            else {
                console.log("ok")
            }
        });
    }

    if (albumLocation) {
        locationID = albumLocationID
        locations.insert({
            "_id": albumLocationID,
            "name": albumLocation,
            "latitude": albumLatitude,
            "longitude": albumLongitude
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                console.log("db error: album location")
            }
            else {
                console.log("ok")
            }
        });
    }

    bands.insert({
        "_id": bandID,
        "name": bandName,
        "location_id": bandLocationID
    }, function (err, doc) {
        if (err) {
            console.log("db error: band")
        }
        else {
            console.log("ok")
        }
    });

    albums.insert({
        "band_id": bandID,
        "location_id": locationID,
        "name": albumName,
        "year": albumYear,
        "month": albumMonth,
        "sales": albumSales
    }, function (err, doc) {
        if (err) {
            console.log("db error: album")
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
    });

});

router.get('/bands', function(req, res) {
    var db = req.db;
    var name = req.param('name');
    if (name) {
        db.collection('bands').find({name:name}).toArray(function(e, results){
            if (e) return next(e)
            res.send(results)
        })
    } else {
        db.collection('bands').find({}).toArray(function(e, results){
            if (e) return next(e)
            res.send(results)
        })
    }
});

router.get('/lookup', function(req, res) {
    var location = req.param('location');
    var url = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.placemaker%20WHERE%20documentContent%20%3D%20%22"+location+"%22%20AND%0A%20%20%20%20%20%20documentType%3D%22text%2Fplain%22&format=json&callback="

    request(url, function(err, resp, body) {
      body = JSON.parse(body);
      res.send(body);
    });

});

router.get('/locations', function(req, res) {
    var db = req.db;
    var location = req.param('location');
    if (location) {
        db.collection('locations').find({_id:location}).toArray(function(e, results){
            if (e) return next(e)
            res.send(results)
        })
    } else {
        db.collection('locations').find({}).toArray(function(e, results){
            if (e) return next(e)
            res.send(results)
        })
    }
});

router.get('/albums', function(req, res) {
    var db = req.db;
    db.collection('albums').find({}).toArray(function(e, results){
        if (e) return next(e)
        res.send(results)
    })
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Add new album' });
});

module.exports = router;
