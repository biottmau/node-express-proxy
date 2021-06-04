const conf = require("../config/config");

var mHttp = conf.proxy.http;

module.exports = (req, response) => {
  if (req.headers.host !== null) {
    console.log("CAMBIO HOST EN HEADER " + req.headers.host);
    req.headers.host = "mobile-api.quadminds.com";
  }
  console.log("POST: " + req.url);
  console.log("POST: " + JSON.stringify(req.headers));
  var sData = JSON.stringify(JSON.parse(JSON.stringify(req.body)));
  var i = 0;
  if (req.headers["content-type"].includes("urlencoded")) {
    sData = "";
    for (var item in req.body) {
      //		console.log(item)
      if (i > 0) sData += "&";
      sData += item + "=" + req.body["" + item];
      i++;
    }
    console.log("BODY: " + sData);
  } else {
    sData = JSON.stringify(req.body);
    console.log("BODY 1: " + sData);
  }
  // Tengo que verificar el authorization
  var custom_header = {
    "content-type": req.headers["content-type"],
    "content-length": sData.length,
  };
  if (req.headers.authorization != null)
    custom_header = {
      ...custom_header,
      authorization: req.headers.authorization,
    };
  var options = {
    host: conf.proxy.host,
    port: conf.proxy.port,
    method: "POST",
    path: req.url,
    headers: custom_header,
    body: sData,
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
  request.write(sData);
  request.end();
};
