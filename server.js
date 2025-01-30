import * as dotenv from "dotenv";
import http from "http";
import url from "url";

import { routing } from "./routes.js";

dotenv.config();

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl.pathname);
  routing(parsedUrl.pathname, res);
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
