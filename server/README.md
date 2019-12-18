# Yowza Server

[< Go Back To Root](https://github.com/KhoomeiK/yowza)

Codebase for database, fetching, data processing, etc.

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
