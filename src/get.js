const conf = require("../config/config");

var mHttp = conf.proxy.http;

module.exports = (req, response) => {
  console.log(req.url);
  var options = {
    host: conf.proxy.host,
    port: conf.proxy.port,
    path: req.url,
  };
  var _url = req.url;
  var request = mHttp.request(options, function (res) {
    var data = "";
    res.on("data", function (chunk) {
      data += chunk;
      response.write(chunk);
    });
    res.on("end", function () {
      console.log(_url + " RESULTADO:");
      console.log(data);
      console.log("=====================================\n\n");
      response.end();
    });
    res.on("close", function () {
      response.end();
    });
  });
  request.on("error", function (e) {
    console.log(e.message);
  });
  request.end();
};
