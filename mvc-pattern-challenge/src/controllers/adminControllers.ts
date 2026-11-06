import { type Request, type Response } from "express";
import { slugify } from "../models/postModel";
import { getPostsResultObject } from "../controllers/postControllers";
import {
  getPostBySlug,
  deletePost as modelDeletePost,
  addPost,
  patchPost,
} from "../models/postModel";

export const getPosts = async (req: Request, res: Response) => {
  const { posts, totalPages, currentPage } = await getPostsResultObject(req);

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

export const newPostPage = (_req: Request, res: Response) => {
  res.render("createPostAdmin.html", {
    post: null,
    action: "/admin/posts/",
  });
};

export const editPostPage = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const slug = req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("createPostAdmin.html", {
    post,
    action: `/admin/posts/${slug}/`,
  });
};

// API:
export const createPost = (req: Request, res: Response) => {
  console.log(req.body);
  //TODO  Create Post (Model fnk)
  //addPost(req.body);
  res.redirect("/admin");
};

export const editPost = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const slug = req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }
  const post = await getPostBySlug(slug);
  //console.log(post.id);
  //TODO  Change Post (Model fnk)
  //patchPost(req.body);
  res.redirect("/admin");
};

export const deletePost = (req: Request<{ slug: string }>, res: Response) => {
  const slug = req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }
  modelDeletePost(slug);
  res.redirect("/admin");
};
