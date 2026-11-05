# How to deploy

How-to guide: publish the site. Production is hosted on **Vercel** at https://portfolio-two-puce-19.vercel.app.

## Normal deploy

Vercel builds from the Git repository ([github.com/AhmedElbialy148/Portfolio](https://github.com/AhmedElbialy148/Portfolio)). Pushing to `master` triggers a production deploy, and other branches get preview URLs.

Vercel project settings (Framework preset: Vite):

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node.js version  | 22.x            |

Verify a build locally before pushing:

```bash
npm run build
npm run preview
```

## SPA routing rewrite

The app uses client-side routing (`react-router-dom`), so every path has to serve `index.html`. [vercel.json](../../vercel.json) does this:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Vercel serves files that exist in `dist/` (CV, images, Lottie JSON) before it applies rewrites, so static assets are unaffected. Without this file, opening `/codes` directly returns 404.

[`_redirects`](../../_redirects) does the same job on Netlify and is ignored by Vercel. Delete it if you stay on Vercel.

## After deploying

- [ ] Open `/` and `/codes` directly in a fresh tab, not by clicking through from the home page.
- [ ] Open `/Ahmed_Adel_CV.pdf` and confirm it's the latest version.
- [ ] Toggle light and dark themes.
