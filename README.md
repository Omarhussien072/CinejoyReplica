# Cinejoy

A fast, sleek movie and TV show discovery platform built with React 19, Vite, Tailwind CSS v4, and the TMDB API. Cinejoy delivers a fluid streaming-app experience featuring dynamic video backdrops, smooth pill navigation transitions, local cache optimizations, and full media detail views.

## Interface Showcase

### Hero Spotlight & Navigation
![Hero Banner & Dynamic Navigation Header](./screenshots/hero-spotlight.png)

### Streaming Providers & Discovery
![Watch Provider Selector & Trending Movies](./screenshots/browse-providers.png)

### Content Details & Video Player
![Media Details Page with Embedded Trailer Player](./screenshots/media-details-player.png)

### Discovery Galleries
![Movies Discovery Page](./screenshots/movies-gallery.png)
![TV Series Discovery Page](./screenshots/tv-shows-gallery.png)

### Trending & Top Rated Content Carousels
![Trending Series & Top Rated Movies](./screenshots/trending-categories.png)

### Interactive Card Overlay & Ratings
![Card Hover State with Quick Controls](./screenshots/card-hover-details.jpg)

### Recommendations & Footer
![You Might Also Like & Footer Branding](./screenshots/recommendations-footer.png)

## Features

- **Dynamic Hero Spotlight**: Auto-rotating hero banner (6-second interval) with high-res backdrop art, official PNG title logos, ratings, release info, and embedded YouTube trailer playback.
- **Sliding Pill Navigation**: Custom-engineered active link indicator that dynamically calculates element bounds to animate across desktop navigation links, paired with a floating mobile navigation bar.
- **Provider & Category Discovery**: Region-based watch provider slider (Netflix, Disney+, Prime, Apple TV+, etc.) and horizontal carousels for trending/top-rated titles.
- **Client-Side Caching Layer**: Custom API service layer wrapping TMDB endpoints with a `localStorage` cache (`movies`, `shows`, `detailsCache`, `heroMovies`, etc.) to minimize API overhead and speed up route transitions.
- **Rich Media Details Page**: Dedicated views for movies and series featuring synopses, video trailers, cast credits, and algorithm-based recommendations.
- **Responsive Glassmorphism UI**: Engineered for dark mode with subtle backdrops, smooth Motion transitions, and clean layout scaling across desktop and mobile.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS Modules
- **Animations**: [Framer Motion / Motion](https://motion.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Carousels**: [Swiper 14](https://swiperjs.com/)
- **Video Player**: [React YouTube](https://github.com/tjallingt/react-youtube)
- **Data Source**: [TMDB API](https://www.themoviedb.org/documentation/api) via Axios

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed on your machine.

### Environment Setup

Create a `.env` file in the root directory and supply your TMDB API credentials:

```env
VITE_API_URL=https://api.themoviedb.org/3/
VITE_API_KEY=your_tmdb_api_key_here
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Omarhussien072/Cinejoy.git
   cd Cinejoy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

### Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Starts Vite dev server |
| `npm run build` | Bundles production assets into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint checks across project files |

## Project Structure

```text
Cinejoy/
├── screenshots/                # Application UI screenshots
│   ├── hero-spotlight.png
│   ├── browse-providers.png
│   ├── media-details-player.png
│   ├── movies-gallery.png
│   ├── tv-shows-gallery.png
│   ├── trending-categories.png
│   ├── card-hover-details.jpg
│   └── recommendations-footer.png
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Card/               # Reusable backdrop & overlay cards
│   │   ├── CarouselComponent/  # Swiper-based title sliders
│   │   ├── Details/            # Media overview, cast & recommendations
│   │   ├── Footer/             # Footer links & copyright
│   │   ├── Home/               # Hero banner & discovery sections
│   │   ├── Layout/             # Router wrapper with Navbar/Footer
│   │   ├── Movies/             # Movies gallery grid
│   │   ├── MyList/             # Saved watch list view
│   │   ├── Navbar/             # Glass header & animated magic pill
│   │   ├── NotFound/           # 404 handler
│   │   ├── Search/             # Search view
│   │   ├── Settings/           # App settings view
│   │   └── Shows/              # TV Series gallery grid
│   ├── Services/
│   │   └── ApiService/         # Axios TMDB requests & localStorage cache
│   ├── App.jsx                 # React Router v7 configuration
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles & Tailwind v4 directives
├── vercel.json                 # Vercel SPA routing rewrite rules
└── vite.config.js              # Vite configuration with Tailwind plugin
```

## Deployment

This app is configured for single-page app (SPA) routing on hosts like Vercel or Netlify via `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
