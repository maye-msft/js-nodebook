var express = require('express');
var crypto = require('crypto');
var axios = require('axios');
var stringify = require('json-stringify-safe');
var querystring = require("querystring");
var router = express.Router();

var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});


router.post('/hello', function (req, res) {


    res.send("hello")

});


router.post('/httpreq'  , function (req, res) {
    const paramstr = querystring.stringify(req.body.params);
    axios({
        method: req.body.method,
        url: req.body.url+"?"+paramstr,
        data: req.body.data,
        headers: req.body.headers
    }).then(function (response) {
        res.send(response.data)
    }).catch(function(e){
        res.send(e)
    });
    

});





module.exports = router;