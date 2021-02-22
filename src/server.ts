import express, { json } from "express";
const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello world - NLW04" });
});

app.post("/users", (request, response) => {
  return response.json({ message: "user saved!" });
});

app.listen(3333, () => console.log("server is running!"));
