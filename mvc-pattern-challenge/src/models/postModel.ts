import { getDB } from "../db/database";

export interface Post {
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
}

export interface Filter {
  author: string;
  sort: "oldest" | "newest";
  page: number;
}

export type PostsResultObject = {
  posts: Post[];
  totalPages: number;
  currentPage: number;
};

const PAGE_SIZE = 10;

let seedPosts: Post[] = [];

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function loadPosts(): Promise<Post[]> {
  const db = getDB();
  return db.all<Post[]>("SELECT * FROM blog_entries");
}

export async function getPosts(filter: Filter): Promise<PostsResultObject> {
  const posts = await loadPosts();

  const filteredPosts = filter.author
    ? posts.filter((post) =>
        post.author.toLowerCase().includes(filter.author.toLowerCase()),
      )
    : posts;

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (filter.sort === "oldest") {
      return a.createdAt - b.createdAt;
    }
    return b.createdAt - a.createdAt;
  });

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
  const currentPage = Math.min(filter.page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedPosts = sortedPosts.slice(start, start + PAGE_SIZE);

  return { posts: pagedPosts, totalPages, currentPage };
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const db = getDB();
  const posts = await db.all<Post[]>("SELECT * FROM blog_entries");

  return posts.find((post) => slugify(post.title) === slug);
}

export async function deletePost(slug: string): Promise<void> {
  const db = getDB();
  await db.run("DELETE FROM blog_entries WHERE slug = ?", slug);
}

export function addPost(_post: Post): void {
  //TODO  Create Post
  return;
}

export function patchPost(_post: Post): void {
  //TODO  Change Post
  return;
}
