import { type Request, type Response } from "express";
import { slugify } from "../models/postModel";
import { getPostsResultObject } from "../controllers/postControllers";
import { getPostBySlug } from "../models/postModel";

export const getPosts = (req: Request, res: Response) => {
  const { posts, totalPages, currentPage } = getPostsResultObject(req);

  const view = posts.map((post) => ({
    ...post,
    slug: slugify(post.title),
  }));

  res.render("admin.html", {
    posts: view,
    controls: {
      author: "",
      sort: "",
      page: currentPage,
      totalPages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    },
  });
};

export const createPost = (_req: Request, res: Response) => {
  res.render("createPostAdmin.html", {
    post: null,
    action: "/admin/posts/",
  });
};

export const editPost = (req: Request<{ slug: string }>, res: Response) => {
  const slug = req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("createPostAdmin.html", {
    post,
    action: `/admin/posts/${slug}/`,
  });
};
