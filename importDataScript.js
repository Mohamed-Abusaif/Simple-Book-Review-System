import * as fs from "fs";

const booksData = fs.readFileSync("./data/books.json", "utf8");
const books = JSON.parse(booksData);
console.log(books);
const reviewsData = fs.readFileSync("./data/reviews.json", "utf8");
const reviews = JSON.parse(reviewsData);
const usersData = fs.readFileSync("./data/users.json", "utf8");
const users = JSON.parse(usersData);

const importData = async () => {};
