import { client, connectDB } from "./data/connection.js";
import * as fs from "fs";
import path from "path";
import { get } from "http";

const booksDataJSON = JSON.parse(
  fs.readFileSync(path.resolve("public", "books.json"), "utf-8")
);
const reviewsDataJSON = JSON.parse(
  fs.readFileSync(path.resolve("public", "reviews.json"), "utf-8")
);

// console.log(booksDataJSON);
// console.log(reviewsDataJSON);

export async function getBooks(res) {
  await connectDB();
  const database = client.db("cluster0");
  const books = database.collection("books");
  const booksData = await books.find({}).toArray();
  let totalObject = {
    booksData: booksData,
    total: booksData.length,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(totalObject));
}

export async function addBooks(res) {
  await connectDB();
  const database = client.db("cluster0");
  const books = database.collection("books");
  const newBooks = booksDataJSON;
  // let result = [];
  // newBooks.forEach(async (book) => {
  //   result.push(await books.insertOne(book));
  // });
  // await books.insertMany(newBooks);

  await books.insertOne({
    title: "Secrets of the Past",
    author: "Elizabeth Wright",
    isbn: "978-3-16-148427-8",
    publish_date: "2019-02-23T00:00:00Z",
    genre: "Mystery",
    description: "A mystery surrounding old secrets and dark family histories.",
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  // res.end(JSON.stringify({ result: "Book added" }));
  res.end("Book added");
}

export async function updateBooks(res) {
  await connectDB();
  const database = client.db("cluster0");
  const books = database.collection("books");
  const updatedBooks = await books.updateOne(
    { _id: "50555555555555557777777777755555555555" },
    { $set: { title: "Secrets of the Past (Updated)" } }
  );
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("Book updated");
}

export async function deleteBooks(res) {
  await connectDB();
  const database = client.db("cluster0");
  const books = database.collection("books");
  const deletedBooks = await books.deleteMany({
    title: "Into the Abyss (Updated)",
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(deletedBooks));
}
//--------------------------------------------------------------------------------------------//
export async function addReview(res, review) {
  await connectDB();
  const database = client.db("cluster0");
  const reviews = database.collection("reviews");
  const newReview = reviewsDataJSON;

  let result = [];
  newReview.forEach(async (review) => {
    result.push(await reviews.insertOne(review));
  });
  await reviews.insertMany(newReview);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

export async function getReviews(res) {
  await connectDB();
  const database = client.db("cluster0");
  const reviews = database.collection("reviews");
  const allReviews = await reviews.find({}).toArray();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(allReviews));
}

export async function updateReview(res, reviewId, updatedReview) {
  await connectDB();
  const database = client.db("cluster0");
  const reviews = database.collection("reviews");
  const result = await reviews.updateOne(
    { _id: reviewId },
    { $set: updatedReview }
  );
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("Review updated");
}

export async function deleteReview(res, reviewId) {
  await connectDB();
  const database = client.db("cluster0");
  const reviews = database.collection("reviews");
  const result = await reviews.deleteOne({ _id: reviewId });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}
//--------------------------------------------------------------------------------------------//
