import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postRouter from "./routes/postRouters";
import textpagesRouters from "./routes/textpagesRouters";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");

nunjucks.configure(path.join(projectRoot, "views"), {
  autoescape: true,
  express: app,
});
app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));

app.use("/", postRouter);
app.use("/", textpagesRouters);

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
