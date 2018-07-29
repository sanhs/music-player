const app = require('express')();
const fs = require('fs');
const load = require('audio-loader');

const logger = require('./logger');

const IP = '127.0.0.1';
const PORT = '8000';
const BASE_PATH = '/media/l/C09021D69021D426/workspace/music-player/src/components/';

var getTrack = function (req, res) {
    console.log(req.params, req.query);
    // load('file:'+BASE_PATH+req.params).then(function (buffer) {
    res.set('Content-Type', 'audio/mpeg'); 
    fs.createReadStream(BASE_PATH+req.params.track+'.mp3').pipe(res)
    // }).catch(function (err) {logger.error(err)});
}

// NOTE: set headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// NOTE: routes
app.get('/:track', getTrack)

// NOTE: server props and exception handling
var server = app.listen(PORT, IP, function (err, res) {
    if (err) logger.error(err);
    logger.info('server started on:', IP + ':' + PORT, '...\n CTRL+c to stop');
})

process.on('SIGINT', function () {
    server.close();
    logger.info('closing server...')
    process.exit();
  });
  
  process.on('uncaughtException', function (err) {
    logger.error(err);
  });