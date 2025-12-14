This is an [ISR (Incremental Static Regeneration)](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) example project built with [Next.js](https://nextjs.org), demonstrating fuzzy search support for content.

## Target Audience
Do you find yourself the need to build a static site with below requirement?

- The Main content comes from the CMS
- Don't want to rebuild the application after content changes each time. Support caching
- Looking for a SSR/SSG solution tailered for SEO, initial loading speed etc
- Support i18n
- Support fuzzy search

If the answer is yes, this repository is for you, please refer to [this article](https://medium.com/@hohin523/solution-build-a-next-js-static-site-with-cms-daf6a80ffad8)

## Features

- ⚡ **ISR** for fast page loads and up-to-date content
- 🔍 **Fuzzy Search** powered by [Fuse.js](https://fusejs.io)  
- 🛠️ Next.js 13+ App Router

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.

## About Fuzzy Search

The product search leverages Fuse.js for fast, client-side searching. Try searching by name, description, or category — results update as you type!

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [ISR in Next.js](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)
- [Fuse.js Documentation](https://fusejs.io)