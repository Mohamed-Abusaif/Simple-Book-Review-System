import { client, connectDB } from "./data/connection.js";
import { get } from "http";

import booksDataJSON from "./data/books.json" assert { type: "json" };
import reviewsDataJSON from "./data/reviews.json" assert { type: "json" };

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

export async function addBooks(req, res) {
  await connectDB();
  const database = client.db("cluster0");
  const books = database.collection("books");
  const newBooks = booksDataJSON;
  let result = [];
  newBooks.forEach(async (book) => {
    result.push(await books.insertOne(book));
  });
  await books.insertMany(newBooks);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

export async function updateBooks(res) {
  await connectDB();
  const database = client.db("cluster0");
  const books = database.collection("books");
  const updatedBooks = await books.updateOne(
    { title: "Secrets of the Past" },
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
