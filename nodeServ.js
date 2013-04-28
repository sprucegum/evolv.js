/*
	JTK server backendy
*/


var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mongoClient = require('mongodb').MongoClient,
    index;
var staticResource = require('static-resource');



var handler = staticResource.createHandler(fs.realpathSync('./'));
//handler.addContentType('.ttf', 'application/octet-stream');

windows = [
	[{"type":"textLine", "text":"JTK"},{"type":"textWindow","title":"About This Site" ,"text":"This website is a demonstration of the server-client methodology of JTK"}],
	[{"type":"textWindow","title":"About JTK" ,"text":"JTK is an experimental canvas application framework. It is built for the Chromium browser and is designed to stress the CPU. "},{"type":"textWindow","title":"About Me" ,"text":"Since it was probably me that linked you to this, you probably know I am Jade Lacosse, purveyor of pointless programs!"},{"type":"textWindow","title":"About the future" ,"text":"As JTK develops, it will effectively become a real-time, multi-user operating system for canvas based web apps."}]
];

http.createServer(function (req, res) {
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
	rJSON = JSON.stringify(windows);
	res.write(rJSON);
  } else if(!handler.handle(path, req, res)) {
	console.log(qPath);
	res.writeHead(404);
	res.write('404');
	res.end();
  }
  res.end('');
  
}).listen(1337, '192.168.0.29');

console.log('Server running at http://127.0.0.1:1337/');

/*
silly test
[[{"type":"textWindow","title":"Wu-Tang Clan", "text":"Ain't nothing to fuck with!"},{"type":"textWindow","title":"Hello World", "text":"Hut one, hut two, hut three, HUT!"}],[{"type":"textLine", "text":"Old Dirty Bastard"}]]
*/
