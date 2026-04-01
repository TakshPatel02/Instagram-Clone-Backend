# Instagram Clone Backend

A Node.js + Express backend for an Instagram-like application.

It supports:

- User authentication with JWT (access + refresh token flow)
- Post creation with image uploads via ImageKit
- Comments on posts
- Like/unlike posts
- Follow/unfollow users

## Tech Stack

- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Multer (memory storage)
- ImageKit
- Zod

## Project Structure

```text
.
├── connection.js
├── index.js
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
└── validations/
```

## Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)
- ImageKit account and credentials

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root.

3. Add the following environment variables:

```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

4. Start the server:

```bash
npm start
```

Server default route:

- `GET /` -> `Home route`

## Scripts

- `npm start` : Runs the server with Node watch mode.

## API Base URL

```text
http://localhost:<PORT>
```

## Authentication

Protected routes require an access token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

### Auth Endpoints

Base path: `/auth`

- `POST /signup`
  - Body:
    - `name` (string, min 2)
    - `username` (string, min 3)
    - `email` (valid email)
    - `password` (string, min 6)

- `POST /login`
  - Body:
    - `email`
    - `password`

- `PATCH /logout` (protected)

- `GET /refresh-token`

## Posts

Base path: `/post`

- `POST /create-post` (protected, multipart/form-data)
  - Fields:
    - `caption` (text)
    - `image` (file)

- `GET /get-posts`

- `GET /get-user-posts` (protected)

## Comments

Base path: `/comment`

- `POST /posts/:postId` (protected)
  - Body:
    - `commentText` (string, min 1)

- `GET /posts/:postId` (protected)

## Likes

Base path: `/like`

- `POST /posts/:postId` (protected)
  - Toggles like/unlike for the authenticated user

## Followers

Base path: `/follow`

- `POST /follow/:userId` (protected)
- `DELETE /unfollow/:userId` (protected)
- `GET /followers/:userId` (protected)
- `GET /following/:userId` (protected)
- `GET /isFollowing/:userId` (protected)

## Response Shape (Typical)

Most endpoints return JSON in this style:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Validation errors return:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address."
    }
  ]
}
```

## Notes

- CORS is currently configured for `http://localhost:5173`.
- Refresh tokens are set as secure, httpOnly cookies.
- If you are testing refresh/logout with cookies, ensure cookie parsing middleware is enabled and HTTPS/secure cookie behavior is configured appropriately for your environment.

## Future Improvements

- Add centralized error handling middleware
- Add request logging and rate limiting
- Add API docs via Swagger/OpenAPI
- Add automated tests (unit + integration)
