const http = require("http");
const app = require("./app");

const port = process.env.port || 5000;

const server = http.createServer(app);

// server.listen(port, "68.178.160.124");
server.listen(port);
