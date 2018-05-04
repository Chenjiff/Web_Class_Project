var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var users = [];
var currentUser = {};
var receive = false;

http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var requireUrl = url.parse(request.url, true);
  var filepath = path.resolve("assets");
  var realpath = path.join(filepath, pathname);
  var ext = pathname.match(/(\.[^.a]+|)$/)[0];
  request.addListener("data", function(postDataChunk) {
    var newUser = qs.parse(postDataChunk.toString());
    receive = true;
    var status = ifRepeat(newUser);
    if(status == "ok") users.push(newUser);
    response.end(status);
  });
  switch(ext){
    case ".css":
    case ".js":
      fs.readFile(realpath, 'utf-8',function (err, data) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": {
          ".css": "text/css",
          ".js": "application/javascript"}[ext]
        });
        response.write(data);
        response.end();
      });
      break;
    case ".jpg":
      fs.readFile(realpath, 'binary',function (err, data) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "image/jpeg"});
        response.write(data, 'binary');
        response.end();
      });
      break;
    case ".ico":
      break;
    default:
      if(!check(requireUrl.query.username)) {
        fs.stat(path.join(filepath, "/html/login.html"), function(err, stats) {
          if(err) {
            response.writeHead(404, {'Content-Type': 'text-plain'});
            response.end(err.message);
            console.log(err);
          }else if(receive == true) {
            receive = false;
            return;
          }else {
            fs.readFile(path.join(filepath, "/html/login.html"), (err, data) => {
              if(err) {
                response.writeHead(500, {'Content-Type': 'text-plain'});
                response.end(err.message);
                console.log(err);
              }
              else {
                response.writeHead(200, {'Content-Type': 'text-plain'});
                response.write(data);
                response.end();
              }
            })
          }
        });
      }else{
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write("<!DOCTYPE html");
        response.write('<html lang="en">');
        response.write("<head>");
        response.write('<meta charset="UTF-8">');
        response.write("<title>Personal Page</title>");
        response.write('<link rel="stylesheet" type="text/css" href="../css/person.css">');
        response.write("</head>");
        response.write("<body>");
        response.write('<div id="page">');
        response.write('<div id="main">');
        response.write("<p>用户名:&ensp;" + currentUser.name +"</p>");
        response.write("<p>&emsp;学号:&ensp;" + currentUser.stid +"</p>");
        response.write("<p>&emsp;电话:&ensp;"+ currentUser.phone +"</p>");
        response.write("<p>&emsp;邮箱:&ensp;"+ currentUser.email +"</p>");
        response.write("</div>");
        response.write("</div>");
        response.write("</body>");
        response.write("</html>");
        response.end();
        currentUser = {};
      }
  }
}).listen(8000);
console.log('Run..\nOn "http://localhost:8000"');

function check(name) {
  for(var i = 0; i < users.length; i++) {
    if(users[i].name == name) {
      currentUser = users[i];
      return true;
    }
  }
  return false;
}
function ifRepeat(user) {
  for(var i = 0; i < users.length; i++) {
    if(users[i].name == user.name) return "name";
    if(users[i].stid == user.stid) return "stid";
    if(users[i].phone == user.phone) return "phone";
    if(users[i].email == user.email) return "email";
  }
  return "ok";
}
