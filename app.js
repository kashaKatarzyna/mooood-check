var express   = require('express'),
 app          = express(),
 watson       = require('watson-developer-cloud');

var bodyParser = require('body-parser');
app.listen(3000);

var toneAnalyzer = watson.tone_analyzer({
 url: 'https://gateway.watsonplatform.net/tone-analyzer-beta/api/',
 username: 'e5c64c08-8993-492b-ae49-baba98c7865b',
 password: '6rfx2ArnKjW7',
 version_date: '2016-11-02',
 version: 'v3-beta'
});

app.use(bodyParser.json());   // This is the type of body we're interested in
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/:data', function(req, res, next) {

toneAnalyzer.tone({text: req.params.data}, function(err, tone) {
 console.log(req.params.data);
   if (err)
     return next(err);
   else
     return res.send(JSON.stringify(tone, null, 2));
 });
});
