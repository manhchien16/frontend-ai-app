# UTT AI App

UTT AI App is a web application built with **Next.js 13**, **React**, and **Express.js**. It serves as a social media platform featuring functionalities such as chat, posts, comments, emoji reactions, and video posting.

## Features

- Real-time chat functionality
- Post creation and management
- Commenting system
- Emoji reactions support
- Next.js 13 framework for frontend
- Backend powered by Express.js
- Uses Axios for API requests
- Eslint for code linting

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version 18+)
- [Git](https://git-scm.com/)

### Clone the repository

```sh
$ git clone https://github.com/manhchien16/nextjs-ai-chatbot.git
$ cd utt-ai-app
```

### Install Dependencies

```sh
$ npm install
```

## Development Server

To start the development server, run:

```sh
$ npm run dev
```

This will start a local development server at `http://localhost:3000/`.

## Building for Production

To build the project for production, run:

```sh
$ npm run build
```

## Starting the Production Server

After building the project, you can start the production server with:

```sh
$ npm run start
```

## Linting

To ensure code quality, run ESLint with:

```sh
$ npm run lint
```

## Deployment

To deploy this Next.js app for free, you can use:

- [Vercel](https://vercel.com/) (Recommended for Next.js apps)
- [Netlify](https://www.netlify.com/) (Supports Next.js with serverless functions)
- [Railway](https://railway.app/)
- [Render](https://render.com/)

## Configuration

1. Rename `.env.example` to `.env.local`
2. Add required environment variables:
   ```plaintext
   NEXT_PUBLIC_API_URL=http://localhost:8088/api/v1
   NEXT_PUBLIC_OTHER_ENV_VAR=value
   ```

## Running the Backend

Make sure your backend (Express.js + Node.js) is running. If you are using the local development environment:

```sh
$ cd backend
$ npm install
$ npm start
```

Ensure that your backend is running on `http://localhost:8088/` as the API is set to this base URL in `services/Http.js`:

```js
const Http = axios.create({
  baseURL: "http://localhost:8088/api/v1/",
  withCredentials: true,
});
export default Http;
```

## License

This project is licensed under the manhchien16.
