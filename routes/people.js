var express = require('express');
var router = express.Router();
var _ = require('lodash'); // decided to use lodash but could achieve the same with native JS array function
var fs = require("fs");

router.get('/count', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);

    var allQueries = buildQueriesArray(req);

    collection.count({ $and: allQueries }, {}, function(e,count){
        res.send(JSON.stringify(count));
        res.end();
    });
});

router.get('/:page', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);

    // Building the query array
    var allQueries = buildQueriesArray(req);
   
    collection.find({ $and: allQueries }, { sort: { name: 1 }, skip: req.params.page * pageSize, limit: pageSize }, function(e,docs){
        res.send(JSON.stringify(docs));
        res.end();
    });
});

router.get('/all', function(req, res, next) {
    var db = req.db;
    var collection = db.get(collectionName);

    collection.find({},{},function(e,docs){
        res.send(JSON.stringify(docs));
        res.end();
    });
});
module.exports = router;

const fieldKeys = {
    NAME: 'name',
    PHONE: 'phone',
    AGE: 'age'
}
const collectionName = 'people';
const pageSize = 10;

function buildQueriesArray(req) {
     return _.reduce(req.query, (queries, value, key) => {
        _.forEach(value.split(","), (word) => {
            var query;

            // Checking what template to put in the queries array
            switch (key) {
                case fieldKeys.NAME:
                    query = { name: { $regex: new RegExp(word, "i") } };
                break;
                case fieldKeys.PHONE:
                    query = { phone: { $eq: word.replace(/(\d{4})(\d)/, "$1-$2") } };
                break;
                case fieldKeys.AGE:
                    var today = new Date();
                    var start = new Date().setFullYear(today.getFullYear() - value - 1);
                    var end = new Date().setFullYear(today.getFullYear() - value);
                    query = { birthday: { $gte: start, $lte: end } };
                break;
                default:
            }

            if (query) queries.push(query);
        });

        return queries;
    }, []);
}