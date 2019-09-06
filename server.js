var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  if (request.url === '/'){
  response.writeHead(504, "Bad gateway error");
  response.write("Bad gateway error");
  response.end();
  }
  else if (request.url === '/listings'){
    response.end(listingData);
  }
  else{
    response.writeHead(404, 'Bad gateway error');
    response.write('Bad gateway error');
    response.end();
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  //Check for errors
  if(err) throw err;
  //Save the data in the listingData variable already defined
  listingData = data;

  //Creates the server
  var server = http.createServer(requestHandler);
  //Start the server
  server.listen(port, function() {
    console.log('Server listening on: http://localhost:' + port);
  });

});
