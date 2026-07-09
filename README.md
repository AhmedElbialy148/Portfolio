# Ahmed Adel — Portfolio

Modern personal portfolio built with **Vite + React + TypeScript + Tailwind CSS**.

Live: [portfolio-adel.vercel.app](https://portfolio-two-puce-19.vercel.app)

## Stack

- Vite 7
- React 19 + TypeScript
- react-router-dom v7
- Tailwind CSS v4
- Motion (animations)
- Feature-Sliced Design (`react-fsd` skill)

## Requirements

- Node.js **22+** (see `.nvmrc`)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Asset slots

Drop real files into `public/assets/` — see [public/assets/README.md](public/assets/README.md).

## Project structure

```
src/
├── app/          # Router, providers, shell
├── views/        # Page compositions (home, codes)
├── widgets/      # Header, hero, sections, footer
├── features/     # Theme toggle, project search
├── entities/     # Project, experience, skill cards
└── shared/       # UI kit, config, tokens, lib
```
