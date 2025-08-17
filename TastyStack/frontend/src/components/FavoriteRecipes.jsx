import { useEffect, useState } from "react";
import axios from "axios";

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);

  const allRecipes = [
    { id: 1, name: "Omelette", image: "/images/omelette.jpg", description: "..." },
    { id: 2, name: "Veg Sandwich", image: "/images/sandwich.jpg", description: "..." },
    { id: 3, name: "Fruit Bowl", image: "/images/fruit-bowl.png", description: "..." },
    { id: 4, name: "Chicken Tikka Masala", image: "/images/chiken.jpg", description: "..." },
    { id: 5, name: "Spicy Penne Pasta", image: "/images/pasta.png", description: "..." },
    { id: 6, name: "Palak Paneer", image: "/images/Palak.jpg", description: "..." },
    // ... all your recipes
  ];

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/favorites/", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
        const favIds = res.data.map((f) => f.recipe_id);
        const favRecipes = allRecipes.filter((r) => favIds.includes(r.id));
        setFavorites(favRecipes);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                backgroundColor: "#ffe8dc",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: "200px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h4>{recipe.name}</h4>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
