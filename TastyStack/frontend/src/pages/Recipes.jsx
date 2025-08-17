import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

export default function Recipes() {
  const [favorites, setFavorites] = useState([]);

  // ✅ Get token ONCE at the top
  const token = localStorage.getItem("token");

  // ✅ Toggle favorite recipe
  const toggleFavourite = async (recipeId) => {
    if (!token) {
      console.error("No token found, user might not be logged in.");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/favorites/toggle/",
        { recipe_id: recipeId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log("Toggle response:", res.data);
      fetchFavorites();
    } catch (err) {
      console.error("Toggle error:", err.response?.data || err.message);
    }
  };

  // ✅ Fetch favorite recipes
  const fetchFavorites = async () => {
    if (!token) {
      console.error("No token found. User not logged in.");
      return;
    }

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/favorites/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const ids = res.data.map((item) => item.recipe_id);
      setFavorites(ids);
    } catch (err) {
      console.error("Fetch favorites error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // ✅ Sample static recipes
  const recipes = [
    {
      id: 1,
      name: "Omelette",
      image: "/images/omelette.jpg",
      description: "A quick and tasty egg dish with onions, tomatoes, and spices.",
    },
    {
      id: 2,
      name: "Veg Sandwich",
      image: "/images/sandwich.jpg",
      description: "A fresh sandwich with cucumbers, tomatoes, and mint chutney.",
    },
    {
      id: 3,
      name: "Fruit Bowl",
      image: "/images/fruit-bowl.png",
      description: "A healthy mix of seasonal fruits with a touch of honey.",
    },
    {
      id: 4,
      name: "Chicken Tikka Masala",
      image: "/images/chiken.jpg",
      description: "Tender chicken pieces marinated in spices and grilled to smoky perfection.",
    },
    {
      id: 5,
      name: "Spicy Penne Pasta",
      image: "/images/pasta.png",
      description: "Spicy Penne Pasta tossed in a zesty tomato sauce with chili and herbs.",
    },
    {
      id: 6,
      name: "Palak Paneer",
      image: "/images/Palak.jpg",
      description: "Palak Paneer is a creamy spinach curry cooked with soft paneer cubes and mild spices.",
    },
  ];

  return (
  <div
    style={{
      margin: 0,
      padding: "2rem",
      backgroundImage: "url('/images/bgr.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    }}
  >
    {/* Top right button */}
    <div style={{ textAlign: "right", marginBottom: "1rem" }}>
      <Link
        to="/favorites"
        style={{
          backgroundColor: "#3d0e0a",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        ❤️ My Favorite Recipes
      </Link>
    </div>

    {/* Page title */}
    <h2
      style={{
        textAlign: "center",
        color: "#ffe8dc",
        fontSize: "2.5rem",
        fontWeight: "600",
        letterSpacing: "1px",
        marginBottom: "1.5rem",
        marginTop: "-10px",
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "block",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      🍽️ Tasty Recipes
    </h2>

    {/* Recipe cards */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            width: "250px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#ffccb8",
            textAlign: "center",
          }}
        >
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <div
            onClick={() => toggleFavourite(recipe.id)}
            style={{
              cursor: "pointer",
              fontSize: "1.4rem",
              color: favorites.includes(recipe.id) ? "red" : "#555",
              marginTop: "0.5rem",
            }}
          >
            {favorites.includes(recipe.id) ? <FaHeart /> : <FaRegHeart />}
          </div>

          <h3 style={{ marginTop: "1rem", color: "#3d0e0a" }}>{recipe.name}</h3>
          <p style={{ fontSize: "0.9rem", color: "#444" }}>{recipe.description}</p>

          <Link to={`/recipes/${recipe.id}`}>
            <button
              style={{
                marginTop: "0.5rem",
                padding: "0.4rem 1rem",
                backgroundColor: "#3d0e0a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              View Recipe
            </button>
          </Link>
        </div>
      ))}
    </div>
  </div>
);
}