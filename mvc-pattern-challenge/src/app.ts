import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postRouter from "./routes/postRouters";
import textpagesRouters from "./routes/textpagesRouters";
import adminRouter from "./routes/adminRouters";
import { closeDB, connectDB } from "./db/database";

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
app.use(express.urlencoded({ extended: true }));

app.use("/", postRouter);
app.use("/", textpagesRouters);

app.use("/admin", adminRouter);

const port = Number(process.env.PORT) || 3000;

await connectDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
