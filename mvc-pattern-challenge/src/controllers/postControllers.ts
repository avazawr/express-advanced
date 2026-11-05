import { type Request, type Response } from "express";
import {
  type Filter,
  type Post,
  type PostsResultObject,
  getPostBySlug as fetchPost,
  getPosts as fetchPosts,
  slugify,
} from "../models/postModel";

function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function createFilter(req: Request): Filter {
  const authorFilter =
    typeof req.query.author === "string" ? req.query.author.trim() : "";
  const sort = req.query.sort === "oldest" ? "oldest" : "newest";
  const page =
    typeof req.query.page === "string" &&
    Number.isInteger(Number(req.query.page))
      ? Math.max(1, Number(req.query.page))
      : 1;

  const filter: Filter = {
    author: authorFilter,
    sort,
    page,
  };
  return filter;
}

export function getPostsResultObject(req: Request): PostsResultObject {
  const filter: Filter = createFilter(req);
  return fetchPosts(filter);
}

export const getPosts = (req: Request, res: Response) => {
  const { posts, totalPages, currentPage } = getPostsResultObject(req);

  const view = posts.map((post: Post) => ({
    ...post,
    slug: slugify(post.title),
    createdAt: formatDate(post.createdAt),
  }));

  const filter: Filter = createFilter(req);

  res.render("index.html", {
    posts: view,
    controls: {
      author: filter.author,
      sort: filter.sort,
      page: currentPage,
      totalPages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    },
  });
};

export const getPostBySlug = (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const slug = req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }

  const post = fetchPost(slug);

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post.html", {
    post: { ...post, createdAt: formatDate(post.createdAt) },
  });
};
