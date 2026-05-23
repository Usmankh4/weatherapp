# Weather Dashboard

A responsive weather application built with React and the OpenWeather API. Search any city to see current conditions and a 5-day forecast, with a Celsius/Fahrenheit toggle, dark mode, and persistent last-searched city across page reloads.

🔗 **Live Demo:** https://weatherapp-kappa-two.vercel.app/

> Add screenshots by dragging images into the GitHub README editor, or with `![alt text](./path/to/screenshot.png)`.

---

## Features

-  **City search** with input validation and error handling for invalid cities
-  **Current weather** display: temperature, humidity, wind speed, conditions, and a dynamic weather icon
-  **5-day forecast** with daily high and low temperatures, icon, and description
-  **Celsius ↔ Fahrenheit toggle** — instant conversion without re-hitting the API
-  **Dark mode toggle** with full-viewport theming via CSS custom properties
-  **Persistence**: last searched city and selected theme survive page reloads
- **Mobile-first responsive design** — works on phone, tablet, and desktop
- **Loading, error, success, and empty UI states** handled cleanly with an exclusive decision tree

---

## Tech Stack

- **React 18** with [Vite](https://vitejs.dev/)
- **JavaScript (ES2022+)**
- **CSS** — custom properties, mobile-first, Flexbox, media queries
- **[OpenWeather API](https://openweathermap.org/api)** — current weather + 5-day/3-hour forecast endpoints
- **Vercel** for deployment

No external state management library or CSS framework — built deliberately with React primitives and vanilla CSS to demonstrate core fundamentals.

---

## Getting Started Locally

### Prerequisites

- Node.js v18 or higher
- A free OpenWeather API key from [openweathermap.org/api](https://openweathermap.org/api)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Usmankh4/weatherapp.git
cd weatherapp

# 2. Install dependencies
npm install

# 3. Create a .env file in the project root with your API key
#    (Vite requires the VITE_ prefix to expose env vars to the client)
echo "VITE_OPENWEATHER_API_KEY=your_api_key_here" > .env

# 4. Run the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## Project Structure

```
src/
├── api/
│   └── weatherApi.js          # getCurrentWeather(city), getForecast(city)
├── components/
│   ├── Header.jsx              # app title + theme toggle button
│   ├── SearchForm.jsx          # controlled input form
│   └── ForeCast.jsx            # single forecast day card
├── utils/
│   ├── celsiusConverter.js     # pure C → F helper
│   ├── urlBuilder.js           # builds weather-icon URLs
│   └── forecastList.js         # transforms raw API list → 5-day summary
├── App.jsx                     # orchestrator: state, handlers, layout
├── main.jsx                    # React app entry point
└── index.css                   # reset, theme variables, layout, responsive styles
```

**Architectural discipline:** each folder has one job. The `api/` layer fetches data and returns it raw. The `utils/` layer holds pure functions with no React. The `components/` layer is presentational. `App.jsx` is the orchestrator, it holds state, owns handlers, and composes everything together.

---

## Key Concepts Demonstrated

This project was built as a deliberate exercise in React fundamentals — each feature exists to anchor a specific concept. See **[CONCEPTS.md](./CONCEPTS.md)** for the detailed breakdown of every React, JavaScript, and CSS concept covered, along with the code location where each is demonstrated.

Highlights:

- **State management** — `useState` with primitive, object, and array shapes; lazy initial state for `localStorage` reads; functional state updaters for safe toggling
- **Side effects** — `useEffect` for `localStorage` reads on mount and for syncing React state with the DOM (`document.body` class)
- **Derived state** — Fahrenheit computed at render from a single Celsius source rather than stored separately (single source of truth)
- **Data transformation** — ~40 raw 3-hour API entries collapsed into 5 clean day-summary objects using `.map`, `.filter`, `Set`, and `Math.max/min` with the spread operator
- **CSS theming** — CSS custom properties with a class toggle on `<body>` for full-viewport dark mode without React re-renders
- **Mobile-first responsive design** with a single 640px breakpoint
- **UI state management** — exclusive `if/else if/else` decision tree (loading → error → success → empty) to prevent stale data from appearing during fetches

---

## Future Improvements

Tracked here as a self-honest list of known smells and polish items:

- Consolidate the three parallel `!isLoading && !error` conditional gates into a single success branch in `App.jsx`
- Use `Promise.all` to parallelize the current-weather and forecast fetches (currently sequential)
- Rename the `ForeCast` component to `ForecastCard` for idiomatic naming
- Move the `localStorage` save for theme into a `useEffect` with `[theme]` deps for stricter consistency
- Accessibility pass: ARIA labels on icon-only buttons, focus management, full keyboard navigation
- Add "use my location" as an optional starting city via the Geolocation API
- Cache previous search results with timestamp expiration to reduce API calls

---

## License

MIT — feel free to use this as a learning reference.
