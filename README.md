# 🎥 Video Buckets

A full-stack video sharing platform built with **Bun**, **React**, **TypeScript**, **Prisma**, and **Cloudflare R2**.

Users can create accounts, upload videos, manage channels, and stream content through a scalable object storage system.

---

## 🚀 Features

### Authentication

* User Signup
* User Login
* Secure JWT Authentication
* HTTP-only Cookies
* Protected Routes
* Logout Support

### Video Management

* Upload Videos
* Upload Thumbnails
* Store media files in Cloudflare R2
* Retrieve Video Metadata
* Channel-based Video Listing

### Channel System

* User Channels
* Custom Channel Names
* Subscriber Count Tracking
* Channel Profile Information

### Modern Frontend

* React + TypeScript
* Tailwind CSS
* React Router
* Floating UI Components
* Responsive Design

### Backend

* Bun Runtime
* REST APIs
* Prisma ORM
* PostgreSQL Database
* Zod Validation
* JWT Authentication

---

# 🏗️ Project Structure

```bash
video-buckets/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── hooks/
│   ├── context/
│   └── pages/
│
├── server/
│   ├── api/
│   │   ├── auth.ts
│   │   ├── channel.ts
│   │   ├── video.ts
│   │   └── objectStore.ts
│   │
│   ├── prisma/
│   ├── middleware/
│   └── utils/
│
├── prisma.config.ts
├── bun.lock
└── package.json
```

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* React Router
* Floating UI

## Backend

* Bun
* Node.js APIs
* Prisma ORM
* JWT Authentication
* Zod Validation

## Database

* PostgreSQL

## Storage

* Cloudflare R2 Object Storage

---

# ☁️ Cloudflare R2 Storage

This project uses Cloudflare R2 for storing:

* Video Files
* Video Thumbnails
* Media Assets

Benefits:

* S3 Compatible API
* Scalable Object Storage
* Low Egress Costs
* Fast Global Delivery

---

# 🔐 Authentication APIs

## POST `/api/auth/signup`

Create a new account.

### Request

```json
{
  "username": "john",
  "password": "password123",
  "channelName": "John Channel",
  "gender": "male"
}
```

### Response

```json
{
  "message": "user successfully register",
  "user": {}
}
```

---

## POST `/api/auth/login`

Authenticate an existing user.

### Request

```json
{
  "username": "john",
  "password": "password123"
}
```

### Response

```json
{
  "message": "user successfully login",
  "user": {
    "id": "user_id",
    "username": "john"
  }
}
```

---

## GET `/api/auth/logout`

Logout the current user.

### Response

```json
{
  "message": "Logged out successfully"
}
```

---

# 📺 Channel APIs

## GET `/channel/:username`

Fetch channel details and uploaded videos.

### Example

```http
GET /channel/john
```

### Response

```json
{
  "channel": {
    "id": "123",
    "username": "john",
    "channelName": "John Channel",
    "profilePicture": "image_url",
    "subscriberCount": 120
  },
  "uploads": []
}
```

---

# 🎬 Video APIs

## Video Endpoints

The `video.ts` module handles:

* Video Upload
* Video Retrieval
* Video Metadata
* Video Management

Example endpoints:

```http
POST /api/video/upload
GET /api/video/:id
DELETE /api/video/:id
```

---

# 📦 Object Storage APIs

The `objectStore.ts` module handles:

* Thumbnail Uploads
* Video Uploads
* R2 Object Management

Example endpoints:

```http
POST /api/object-store/upload
POST /api/object-store/thumbnail
```

---

# ⚙️ Environment Variables

Create a `.env` file in the server directory.

```env
DATABASE_URL=

JWT_SECRET=

R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

---

# 🚀 Local Development

Install dependencies:

```bash
bun install
```

Run database migrations:

```bash
bunx prisma migrate dev
```

Start development server:

```bash
bun dev
```

Build project:

```bash
bun build
```

---

# 🗄️ Database

Prisma ORM is used for database management.

Generate Prisma Client:

```bash
bunx prisma generate
```

Run migrations:

```bash
bunx prisma migrate dev
```

---

# 🔒 Security

* JWT Authentication
* Password Hashing with bcrypt
* Zod Request Validation
* HTTP-only Cookies
* Protected API Routes

---

# 🌟 Future Improvements

* Video Streaming Optimization
* Likes & Comments
* Subscriptions
* Search Functionality
* Playlists
* Watch History
* Real-time Notifications

---

# 📄 License

This project is licensed under the MIT License.
