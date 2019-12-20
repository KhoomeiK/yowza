# Yowza Server

[< Go Back To Root](https://github.com/KhoomeiK/yowza)

Codebase for database, fetching, data processing, etc.

## Express API Documentation

### Root: '/'

Fetches 5 random articles from the database without their main content.
You can then request for the individual slugs to load the articles.

```jsonc
[
  {
    "images": "http://path.to/image.png", // optional
    "post": "Article Title",
    "slug": "Article_Title",
    "views": 6 // optional
  }
  // ...
]
```

### Article: '/a/:slug'

Fetches 1 article from the database with the matching slug.
Increments the `views` (viewcount) for this article.

```jsonc
{
  "comments": [
    "example comment"
    // ...
  ],
  "views": 6, // optional
  "images": "http://path.to/image.png", // optional
  "post": "Article Title",
  "slug": "Article_Title",
  "date": "2019-12-18T03:01:02.029Z"
}
```

### Random: '/random'

Fetches 1 random article from the database without its main content.
You can then request for the individual slug to load the article.

```jsonc
{
  "images": "http://path.to/image.png",
  "post": "Article Title",
  "slug": "Article_Title",
  "views": 6 // optional
}
```

### Any: '/\*'

Paths that don't match the above few will 404

## TODOs

- Comment text processing
- Relevant image/media content fetching
- AdSense setup?
- NSFW filtering?
