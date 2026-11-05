import { Router } from "express";
import {
  getPosts,
  createPost,
  editPost,
} from "../controllers/adminControllers";

const router = Router();

// GET /admin renders a list of all posts with edit and delete buttons next to each entry.
router.get("/", getPosts);

// GET /admin/posts/new renders an empty form for creating a new post.
router.get("/posts/new", createPost);

// GET /admin/posts/:slug/edit renders a form pre-filled with the existing post data.
router.get("/posts/:slug/edit", editPost);

export default router;

// POST /admin/posts creates a new post from the form submission and redirects back to /admin.
// POST /admin/posts/:slug saves the edited post and redirects back to /admin.
// POST /admin/posts/:slug/delete removes the post and redirects back to /admin.
