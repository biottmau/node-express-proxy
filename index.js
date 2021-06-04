const express = require("express");
const app = express();
const conf = require("./config/config");
const get = require("./src/get");
const post = require("./src/post");
app.use(express.json({limit: '20mb', extended: true}))
app.use(express.urlencoded({limit: '20mb', extended: true}))
app.get("*", get);
app.post("*", post);

app.listen(conf.app.port, () => {
	console.log(`Example app listening at http://localhost:${conf.app.port} - Proxy ${conf.proxy.host} `);
});
