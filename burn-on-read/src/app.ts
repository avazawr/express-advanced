import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { randomBytes } from "node:crypto";

import {
  access,
  constants,
  mkdir,
  writeFile,
  readFile,
  unlink,
} from "node:fs/promises";

const MSG_DIR = path.join(process.cwd(), "messages");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const env = nunjucks.configure("templates", {
  autoescape: true,
  express: app,
  watch: true,
});

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.njk");
});

app.post("/messages", async (req, res) => {
  const message = req.body.message;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).send("Invalid message");
  }

  // Generate a unique 20-character token
  const token = randomBytes(10).toString("hex");

  const link = `${req.protocol}://${req.get("host")}/read/${token}.html`;

  await writeFile(path.join(MSG_DIR, `${token}.txt`), message + "\n", {
    encoding: "utf-8",
  });

  res.render("message-created.njk", {
    message,
    link,
  });
});

app.get("/read/:token.html", async (req, res) => {
  const token = req.params.token;

  const filePath = path.join(MSG_DIR, `${token}.txt`);

  if (!(await fileExists(filePath))) {
    const message = "404 Message not found";
    res.render("message.njk", {
      message,
    });
  }

  const message = await readFile(filePath, "utf-8");
  await unlink(filePath);

  res.render("message.njk", {
    message,
  });
});

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

app.listen(PORT, () => {
  console.log(`Event Hub running at http://localhost:${PORT}`);
});
