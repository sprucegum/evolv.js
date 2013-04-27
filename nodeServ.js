/*
	JTK server backendy
*/


var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    index;
var staticResource = require('static-resource');

var handler = staticResource.createHandler(fs.realpathSync('./'));
//handler.addContentType('.ttf', 'application/octet-stream');


http.createServer(function (req, res) {
  var qParsed = url.parse(req.url, true);
  var qData = qParsed.query;
  var qPath = qParsed.pathname;
  //console.log(qPath);
  //console.log(qData);
  //console.log(req, res);
  var path = url.parse(req.url).pathname;
  if(!handler.handle(path, req, res)) {
	console.log(qPath);
	res.writeHead(404);
	res.write('404');
	res.end();
  } else if (qData.jtkConnection){
	console.log("JSON");	
	res.writeHead(200, {'Content-Type': 'text/json'});
	rJSON = JSON.stringify(["Test Title", qPath, qData]);
	res.write(rJSON);
  }
  res.end('');
  
}).listen(1337, '192.168.0.29');

console.log('Server running at http://127.0.0.1:1337/');
