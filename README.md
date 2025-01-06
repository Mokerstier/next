# Photo-viewer

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Summary

Photo-viewer is a web application that allows users to search and view images from Unsplash. The application leverages the Unsplash API to fetch and display images based on user queries and filters. The project is built using Next.js, a React framework that enables server-side rendering and static site generation.

## Tech Stack

- **Next.js**: A React framework that enables server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Unsplash API**: An API to fetch and display images from Unsplash.
- **Vercel**: A platform for deploying Next.js applications.

## Getting Started

First, run the development server:

```
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
```

Open http://localhost:3000 with your browser to see the result.

**note this application requires a unsplash API-key to run**

.env example

```json
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    UNSPLASH_BASE_URL=https://api.unsplash.com
    UNSPLASH_CLIENT_ID={YOUR_API_KEY_HERE}
```

## Features

- **Image Search**: Users can search for images using keywords.
- **Color Filters**: Users can filter images based on selected colors.
- **Infinite Scroll**: The application supports infinite scrolling to load more images as the user scrolls down.
- **Image Details**: Clicking on an image opens a dialog with a larger view and additional details.
- **Responsive Design**: The application is fully responsive and works on all device sizes.
- **Loading Indicator**: A loading spinner is displayed while images are being fetched.
- **Error Handling**: Proper error handling is implemented to display error messages when the API request fails.
