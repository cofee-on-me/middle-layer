const http = require("http");
const https = require("https");

// SOURCE: http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
const getJSON = (options, onResult, onError) => {
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
      onError(err);
    });

    req.end();
};

const getAsyncJSON = (options) => {
  return new Promise((resolve, reject) => {
    getJSON(options, (statusCode, result) => {
        resolve({ statusCode, result });
    }, (err) => {
      reject(err);
    }); 
  });
};

exports.getJSON = getJSON;
exports.getAsyncJSON = getAsyncJSON;