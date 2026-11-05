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

export type GetPostsResult = {
  posts: Post[];
  totalPages: number;
  currentPage: number;
};

const PAGE_SIZE = 2;

let seedPosts: Post[] = [
  {
    title: "Black: The Absence, Not the Presence, of Color",
    image: "colorful-umbrella.jpg",
    author: "Peter Parker",
    createdAt: 1743120000,
    teaser:
      "Scientifically, black is not a color but rather the absence of all colors, occurring when an object absorbs nearly all light wavelengths instead of reflecting them.",
    content:
      "<p>When you think about the rainbow, you see a vibrant spectrum of hues. But black does not appear in that spectrum the same way red or blue does.</p><p>From a scientific perspective, black is usually the absence of visible light, not a reflected wavelength.</p>",
  },
  {
    title: "Flowers: Nature's Muse for Design",
    image: "flowers.jpg",
    author: "Peter Parker",
    createdAt: 1745452800,
    teaser:
      "Flowers inspire design with their color palettes, structure, and balance between repetition and variation.",
    content:
      "<p>Designers borrow from flowers all the time: layered composition, contrasting accents, and natural hierarchy.</p>",
  },
  {
    title: "UDesign's Harmony: Core Purpose and Supporting Details",
    image: "sailing.jpg",
    author: "Peter Parker",
    createdAt: 1748736000,
    teaser:
      "Strong design starts with one clear core idea, then adds supporting details that reinforce it.",
    content:
      "<p>A useful mental model is major and minor elements. Major elements communicate the main point, minor elements support it without stealing focus.</p>",
  },
];

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function loadPosts(): Post[] {
  return seedPosts;
}

export function getPosts(filter: Filter): GetPostsResult {
  const posts = loadPosts();

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

export function getPostBySlug(slug: string): Post | undefined {
  const posts = loadPosts();
  const post = posts.find((p) => slugify(p.title) === slug);

  return post;
}

// Replace all Posts
export function replacePosts(posts: Post[]): void {
  seedPosts = [...posts];
}
