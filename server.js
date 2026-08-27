const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/run") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const expr = new URLSearchParams(body).get("expr") || "";

      let result;
      try {
        result = String(eval(expr));
      } catch (e) {
        result = "Error: " + e.message;
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(result);
    });
    return;
  }

  // Serve the frontend
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(fs.readFileSync(path.join(__dirname, "index.html")));
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
