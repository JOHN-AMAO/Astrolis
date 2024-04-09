import express from "express";
import cors from "cors";
import path from "path";
import simpleGit from "simple-git";
import { generate } from "./utils";
import { getAllFiles } from "./file";
import { uploadFile } from "./aws";

const app = express();

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

  files.forEach(async (file) => {
    await uploadFile(file.slice(__dirname.length + 1), file);
  });
  res.json({
    id: id,
  });
});

app.listen(8000, () => {
  console.log("server is running on port http://localhost:8000");
});
