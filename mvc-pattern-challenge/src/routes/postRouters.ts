import { Router } from "express";

import { getPosts, getPostBySlug } from "../controllers/postControllers";

const router = Router();

router.get("/", getPosts);

router.get("/posts/:slug", getPostBySlug);

export default router;
