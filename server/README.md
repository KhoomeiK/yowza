# Yowza Server

[< Go Back To Root](https://github.com/KhoomeiK/yowza)

Codebase for database, fetching, data processing, etc.

# TODO FROM MIGUEL:
- Document API by showing an example of output (json)
- Add error checking & handling (send me an error object with message & status code)
- Also document errors that can be thrown and what they look like (don't need for all, but at least a section that shows in general what the errors look like)

# Express API Documentation

## '/'
- Fetches 5 random articles from the database and returns their title, slug, and viewcount

## '/a/:slug'
- Fetches 1 article from the database with the matching slug
- Increments viewcount of this article
- Returns 'This article does not exist' if invalid slug

## '/random'
- Fetches 1 random article from the database

## '/*'
- Paths that don't match the above few will 404


# TODOs:
- Comment text processing
- Relevant image/media content fetching
- AdSense setup?
- NSFW filtering?
