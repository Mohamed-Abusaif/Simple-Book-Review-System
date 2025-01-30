import { get } from "http";
import {
  getBooks,
  addBooks,
  updateBooks,
  deleteBooks,
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} from "./crud.js";

function routing(pathname, res) {
  //home
  if (pathname === "/getHomePage" || pathname === "/") {
    res.end("Hello, World!");
  }
  //books
  else if (pathname === "/getBooks") {
    getBooks(res);
  } else if (pathname === "/addBooks") {
    addBooks(res);
  } else if (pathname === "/updateBooks") {
    updateBooks(res);
  } else if (pathname === "/deleteBooks") {
    deleteBooks(res);
  }
  //reviews
  else if (pathname === "/getReviews") {
    getReviews(res);
  } else if (pathname === "/addReview") {
    addReview(res);
  } else if (pathname === "/updateReview") {
    updateReview(res);
  } else if (pathname === "/deleteReview") {
    deleteReview(res);
  }
  //404
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Not Found");
  }
}

export { routing };
