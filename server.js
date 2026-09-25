const http = require("http");
const router = require("./src/core/router")
const server = http.createServer( (req, res) => {
   router.lookup(req, res);

});

server.listen(3000, () => {
   console.log("You running TV http://localhost:3000");
});

