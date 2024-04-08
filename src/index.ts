import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import simpleGit from "simple-git";
import { generate } from "./utils";
import { getAllFiles } from "./file";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ name: "John" });
});

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  await simpleGit().clone(repoUrl, path.join(__dirname, `./output/${id}`));
  const files = getAllFiles(path.join(__dirname, `./output/${id}`));
  console.log(files);
  res.json({ id: id });
});

app.listen(8000, () => {
  console.log("server is running on port http://localhost:8000");
});
