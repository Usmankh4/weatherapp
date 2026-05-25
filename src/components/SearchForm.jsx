import { useState } from "react";

export default function SearchForm({ onSearch, isLoading }) {
  const [cityInput, setCityInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const city = cityInput.trim();
    if (!city) return;
    onSearch(city);
    setCityInput("");
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="City name"
        value={cityInput}
        onChange={(event) => setCityInput(event.target.value)}
        disabled={isLoading}
        aria-label="City name"
      />
      <button type="submit" disabled={isLoading || !cityInput.trim()}>
        Search
      </button>
    </form>
  );
}
