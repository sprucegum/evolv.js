
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    index;

fs.readFile('./cursor.png', function (err, data) {
    if (err) {
        throw err;
    }
    cursorimg = data;
});

fs.readFile('./Display.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;
});
fs.readFile('./jTK.js', function(err, data) {
    if (err) {
        throw err;
    }
    jTK = data;
}); 

http.createServer(function (req, res) {
  var qParsed = url.parse(req.url, true);
  var qData = qParsed.query;
  var qPath = qParsed.pathname;
  console.log(qPath);
  console.log(qData);

  if (qPath.match('jTK.js')){
	res.writeHead(200, {'Content-Type': 'text/javascript'});
	res.write(jTK);

  } else if (qPath.match('cursor.png')){
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.write(cursorimg);

  } else if (qData.jtkConnection){	
	  res.writeHead(200, {'Content-Type': 'text/json'});
	  rJSON = JSON.stringify(["Test Title", qPath, qData]);
	  res.write(rJSON);
  } else {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(index);  
  }
  res.end('');
  
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
