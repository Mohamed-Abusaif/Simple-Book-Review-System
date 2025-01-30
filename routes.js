import { get } from "http";
import { getBooks, addBooks, updateBooks, deleteBooks } from "./crud.js";

function routing(pathname, res) {
  if (pathname === "/getHomePage" || pathname === "/") {
    res.end("Hello, World!");
  } else if (pathname === "/getBooks") {
    getBooks(res);
  } else if (pathname === "/addBooks") {
    addBooks(res);
  } else if (pathname === "/updateBooks") {
    updateBooks(res);
  } else if (pathname === "/deleteBooks") {
    deleteBooks(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Not Found");
  }
}

export { routing };
