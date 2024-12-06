# Picsee Server - RESTful API

RESTful API backend for the **Picsee** image-sharing and social discovery platform, built with **Node.js**, **Express**, and **PostgreSQL**.

---

## Overview

**Picsee Server** powers the backend services for Picsee, enabling artists, creators, and photographers to publish high-resolution media, organize artwork using tags, interact via likes, authenticate seamlessly through email or Google OAuth2, and manage user profiles.

> [!NOTE]
> **Educational & Demonstration Scope**: This project is developed primarily for educational, research, and portfolio demonstration purposes. While it follows solid architectural practices, modular design, and secure authentication flows, it is designed for learning, exploration, and prototype workloads rather than large-scale enterprise deployments.

---

## Features

- **Authentication & Security**:
  - Email and password registration with salted `bcrypt` hashing.
  - Google OAuth2 authentication via `google-auth-library`.
  - JSON Web Tokens (JWT) for stateless session authorization.
  - Secure AES-encrypted password recovery email workflows.
- **Media Processing & Storage**:
  - Multi-file image batch uploads (up to 5 images per post).
  - Automated image compression and optimization via `Sharp`.
  - Multi-cloud storage support (**Google Cloud Storage** & **ImageKit.io**).
  - Binary streaming endpoint for direct image downloads with metadata headers.
- **Social Discovery & Tagging**:
  - Global post feeds with relevance and date-based cursor pagination.
  - Tag extraction, frequency tracking, and tag-filtered search.
  - Like/unlike toggle mechanism with relational integrity.
- **User Management**:
  - Profile customization (avatar, bio, social links, birthdate).
  - Password updates with credential verification.
  - Soft-delete account lifecycle.
- **Automated Image Moderation**:
  - Integration with automated content moderation filters to detect restricted imagery.

---

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v20+ LTS recommended)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with `pg` connection pooling
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/)
- **Cloud Storage**: [Google Cloud Storage](https://cloud.google.com/storage) / [ImageKit](https://imagekit.io/)
- **Testing**: [Jest](https://jestjs.io/)
- **Containerization**: [Docker](https://www.docker.com/)

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **npm** >= 9.x

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/suaadev/picsee-server.git
cd picsee-server
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and customize your configuration:

```bash
cp .env.example .env
```

If using Google Cloud Storage, provide your service account credentials file (e.g., `google-auth.json` referenced by `GOOGLE_APPLICATION_CREDENTIALS`).

### 3. Running the Server

#### Development Mode (with hot-reload):

```bash
npm run dev
```

#### Production Mode:

```bash
npm start
```

The server will start listening on `http://localhost:8000/api/v1`.

---

## Docker Deployment

Build and run the containerized application:

```bash
# Build Docker image
docker build -t picsee-server .

# Run container with environment variables
docker run -d -p 8000:8000 --env-file .env --name picsee-api picsee-server
```

---

## Environment Variables Reference

| Variable                         | Description                       | Example                                        |
| :------------------------------- | :-------------------------------- | :--------------------------------------------- |
| `PORT`                           | Server listening port             | `8000`                                         |
| `URL_DB_POSTGRES`                | PostgreSQL connection URI         | `postgresql://user:pass@localhost:5432/picsee` |
| `JWT_KEY_SECRET`                 | Secret key for JWT access tokens  | `your_secret_key`                              |
| `JWT_SECRET_RECOVER_PASS`        | Secret key for recovery tokens    | `your_recovery_secret`                         |
| `SECRET_ENCRYPT`                 | AES secret key for URL encryption | `your_aes_secret`                              |
| `PUBLIC_KEY_IMAGEKIT`            | ImageKit public key               | `your_public_key`                              |
| `PRIVATE_KEY_IMAGEKIT`           | ImageKit private key              | `your_private_key`                             |
| `URL_ENDPOINT_IMAGEKIT`          | ImageKit URL endpoint             | `https://ik.imagekit.io/picsee/`               |
| `BUCKET_NAME`                    | Google Cloud Storage bucket       | `picsee-storage`                               |
| `GCP_PROJECT_ID`                 | Google Cloud project ID           | `your-gcp-project-id`                          |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to GCP service account key   | `google-auth.json`                             |
| `ID_CLIENT_GOOGLE`               | Google OAuth Client ID            | `your_client_id.apps.googleusercontent.com`    |
| `APP_EMAIL`                      | SMTP sender email address         | `noreply@picsee.app`                           |
| `APP_PASSWORD_EMAIL`             | SMTP email application password   | `your_smtp_password`                           |
| `URL_REDIRECT_RECOVER_PASS`      | Password reset frontend URL       | `https://picsee.app/reset-password`            |

---

## REST API Reference

Base Path: `/api/v1`

### Authentication (`/auth`)

- `POST /auth/sign`: Authenticate user with username/email and password. Returns JWT token.
- `POST /auth/platform`: Authenticate or register using Google OAuth2 credentials.
- `POST /auth/recoverPass`: Send password reset email link with encrypted token.
- `POST /auth/resetPass`: Reset account password using recovery token.

### Users (`/users`)

- `GET /users/:user`: Retrieve public user profile or private account info.
- `POST /users`: Register a new user account.
- `PATCH /users`: Update user profile details and avatar image (`multipart/form-data`).
- `POST /users/password`: Update user password (requires current password).
- `DELETE /users`: Soft delete user account.

### Posts (`/post`)

- `GET /post`: Retrieve paginated posts feed (supports `?query=relevant` and cursor pagination).
- `POST /post`: Upload new post with images and tags (`multipart/form-data`).
- `POST /post/like/:postId`: Toggle like status for a post.
- `GET /post/download/:postId`: Stream binary image file for download.

### Tags (`/tags`)

- `GET /tags`: Retrieve all available tags sorted by popularity.

---

## Running Tests

Execute the Jest test suite:

```bash
npm test
```

---

## License

This project is licensed under the [MIT License](LICENSE).
