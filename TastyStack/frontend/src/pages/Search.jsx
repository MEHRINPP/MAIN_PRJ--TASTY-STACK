import { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import './Search.css';



export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const recipeList = [
    { id: 1, name: "Omelette", image: "/images/omelette.jpg" },
    { id: 2, name: "Veg Sandwich", image: "/images/sandwich.jpg" },
    { id: 3, name: "Fruit Bowl", image: "/images/fruit-bowl.png" },
    { id: 4, name: "Chiken-tikka-Masala", image: "/images/chiken.jpg" },
    { id: 5, name: "Spicy Penne Pasta", image: "/images/pasta.png" },
    { id: 6, name: "Palak Paneer", image: "/images/Palak.jpg" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = recipeList.filter(item =>
      item.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="search-page">
      <div className="search-overlay">
        <h1 className="search-title">Search Recipes 🍳</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter a recipe name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="fancy-button">Search</button>
        </form>

        <div className="search-results">
          {searched && results.length === 0 && (
            <p style={{ color: "#fff" }}>No recipes found for "{query}"</p>
          )}

          {results.map((item) => (
            <Link key={item.id} to={`/recipes/${item.id}`} style={{ textDecoration: "none" }}>
              <div className="result-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="result-image"
                />
                <h3 className="result-name">{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
