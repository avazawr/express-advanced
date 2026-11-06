
-- seeddb.sql

DROP TABLE IF EXISTS blog_entries;

CREATE TABLE IF NOT EXISTS blog_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  image TEXT NOT NULL,
  author TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  teaser TEXT NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO blog_entries (
  title, slug, image, author, createdAt, teaser, content
)
VALUES
(
  'Black: The Absence, Not the Presence, of Color',
  'black-the-absence-not-the-presence-of-color',
  'colorful-umbrella.jpg',
  'Peter Parker',
  1743120000,
  'Scientifically, black is not a color but rather the absence of all colors, occurring when an object absorbs nearly all light wavelengths instead of reflecting them.',
  '<p>When you think about the rainbow, you see a vibrant spectrum of hues. But black does not appear in that spectrum the same way red or blue does.</p><p>From a scientific perspective, black is usually the absence of visible light, not a reflected wavelength.</p>'
),
(
  'Flowers: Nature''s Muse for Design',
  'flowers-nature-s-muse-for-design',
  'flowers.jpg',
  'Peter Parker',
  1745452800,
  'Flowers inspire design with their color palettes, structure, and balance between repetition and variation.',
  '<p>Designers borrow from flowers all the time: layered composition, contrasting accents, and natural hierarchy.</p>'
),
(
  'UDesign''s Harmony: Core Purpose and Supporting Details',
  'udesign-s-harmony-core-purpose-and-supporting-details',
  'sailing.jpg',
  'Peter Parker',
  1748736000,
  'Strong design starts with one clear core idea, then adds supporting details that reinforce it.',
  '<p>A useful mental model is major and minor elements. Major elements communicate the main point, minor elements support them without stealing focus.</p>'
);
