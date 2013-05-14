/*
	JTK server backendy
*/


var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    index;


var nano = require('nano')('http://localhost:5984');
var jdb = nano.use('jdb');

var staticResource = require('static-resource');



var handler = staticResource.createHandler(fs.realpathSync('./'));
//handler.addContentType('.ttf', 'application/octet-stream');


var win = {test:'test'};
jdb.get('main', function(err,body){win=body});


http.createServer(function (req, res) {
  console.log(win);
  var qParsed = url.parse(req.url, true);
  var qData = qParsed.query;
  var qPath = qParsed.pathname;
  //console.log(qPath);
  //console.log(qData);
  //console.log(req, res);
  var path = url.parse(req.url).pathname;
 console.log("qData", qData);
 if (qData.jtk){

	console.log("JSON");	
	res.writeHead(200, {'Content-Type': 'text/json'});
	rJSON = JSON.stringify(win.windows);
	res.write(rJSON);
  } else if(!handler.handle(path, req, res)) {
	console.log(qPath);
	res.writeHead(404);
	res.write('404');
	res.end();
  }
  res.end('');
  
}).listen(1337, '192.168.0.14');

console.log('Server running at http://127.0.0.1:1337/');

/*
silly test
[[{"type":"textWindow","title":"Wu-Tang Clan", "text":"Ain't nothing to fuck with!"},{"type":"textWindow","title":"Hello World", "text":"Hut one, hut two, hut three, HUT!"}],[{"type":"textLine", "text":"Old Dirty Bastard"}]]
*/
