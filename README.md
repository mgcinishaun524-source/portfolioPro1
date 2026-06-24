# Interactive 3D Hero Section

A Vite + React + Tailwind CSS portfolio landing page with an interactive 3D scene and dark/light theme toggle.

## Project Overview

- Uses `react` and `react-dom` for the app structure.
- Uses `@splinetool/react-spline` for the 3D scene embed.
- Uses `framer-motion` for animations.
- Uses Tailwind CSS for styling.
- The app entry is `src/main.tsx` and the root component is `src/App.tsx`.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Important Files

- `index.html` - Vite entry HTML that loads `src/main.tsx`
- `src/main.tsx` - React app bootstrap
- `src/App.tsx` - Main application component
- `src/data.ts` - Project data and image path
- `src/index.css` - Global styles
- `public/profile.png` - Profile image asset
- `vite.config.ts` - Vite configuration
- `package.json` - Dependencies and scripts

## Notes

- The profile image is served from `public/profile.png`.
- If the page loads blank, make sure `src/main.tsx` exists and `npm run dev` is running.
- The project uses Vite path alias `@` to resolve `src/*` imports.

## Troubleshooting

- `Blank white page`: usually means the app entry file is missing or Vite cannot resolve `src/main.tsx`.
- `Image not appearing`: ensure `public/profile.png` exists and `profileImage` points to `/profile.png`.

## Development Notes

- The app needs `src/main.tsx` and `src/App.tsx` to render the React application.
- Static assets like `public/profile.png` must exist in the public folder, since `profileImage` loads from `/profile.png`.
- If you restore from backup or an archive, verify `public/` and `src/` are present before starting Vite.

## License

This project is provided as-is.
