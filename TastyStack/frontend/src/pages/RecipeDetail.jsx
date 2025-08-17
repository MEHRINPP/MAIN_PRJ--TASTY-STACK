import { useParams,useNavigate } from "react-router-dom";

const recipeData = {
  1: {
    name: "Omelette",
    image: "/images/omelette.jpg",
    details: `Prep the eggs: Crack the eggs into a bowl. Beat them with a fork or whisk until fully blended.

Melt the butter: In an 8-inch nonstick skillet over medium-low heat, melt the butter.

Add the eggs and cook the omelette: Add the eggs to the skillet and cook without stirring until the edges begin to set.

Fill the omelette: Add any fillings (like cheese, onions, or herbs) to one side of the omelette.

Fold and plate the omelette: Carefully fold the omelette in half, then slide it onto a plate. Serve warm.`,
  },

  2:{
    name: "Veg Sandwich",
    image: "/images/sandwich.jpg",
    details: `1. Spread butter and green chutney on two slices of bread.

2. Layer cucumber, tomato, onion, and boiled potato slices.

3. Sprinkle chaat masala and salt.

4. Cover with another slice, press gently.

5. Toast on a pan or sandwich maker until golden.

6. Slice and serve with ketchup or chutney.`,
  },

  3: {
    name: "Fruit Bowl",
    image: "/images/fruit-bowl.png",
    details: `1. Wash and chop fresh fruits like apple, banana, grapes, mango, and kiwi.

2. Add a squeeze of lemon juice to keep fruits fresh.

3. Drizzle with honey and sprinkle a pinch of cinnamon.

4. Gently mix and serve chilled.

5. Optionally top with mint leaves or dry fruits.`,
  },
  4: {
    name: "Chiken-tikka-Masala",
    image: "/images/chiken.jpg",
    details: ` 1.In a bowl, mix curd, ginger garlic paste, chili powder, turmeric, garam masala, lemon juice, oil, and salt.

 
2.Add chicken cubes to the bowl and coat them well. Cover and marinate for at least 1 hour.

 
3.Thread the marinated chicken onto skewers (optional).

 
4.Grill in oven at 200°C for 20–25 minutes or cook on a pan until golden and fully cooked.

 
5.Serve hot with lemon slices and mint chutney.`,
  },
  5: {
    name: "Spicy Penne Pasta",
    image: "/images/pasta.png",
    details: `1.Boil the penne pasta in salted water until al dente. Drain and set aside.


2.Heat olive oil in a pan. Sauté garlic and onion until soft.


3.Add tomato puree, chili flakes, pepper, oregano, and salt. Cook for 5–7 minutes.


4.Add boiled pasta to the sauce and mix well. Cook for 2–3 minutes.


5.Top with grated cheese and garnish with basil. Serve hot.`,
  },

  6: {
    name: "Palak Paneer",
    image: "/images/Palak.jpg",
    details: `1.Blanch spinach in hot water for 2–3 minutes, then transfer to cold water. Blend into a smooth paste.


2.Heat oil in a pan. Add cumin seeds, then sauté onion, garlic, and green chili until soft.

3.Add chopped tomato and cook until mushy. Add turmeric and garam masala.

4.Add the spinach puree and cook for 5 minutes. Add salt to taste.

5.Add paneer cubes and cook for another 3–4 minutes.

6.Garnish with cream and serve hot with roti or rice.`,
  },

  


};

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipeData[id];

  if (!recipe) return <h2 style={{ color: "white", textAlign: "center" }}>Recipe not found</h2>;

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "2rem auto",
        backgroundColor: "#f7e4dc",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        color: "#3d0e0a"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.8rem" }}>
        {recipe.name}
      </h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{
            width: "100%",
            maxWidth:"300px",
            height: "220px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      <div style={{ fontSize: "1rem", lineHeight: "1.6", whiteSpace: "pre-wrap",color:"#333" }}>
        {recipe.details}
      </div>

      <div style={{textAlign:"center", marginTop:"2rem"}}>
        <button
            onClick={()=> navigate(-1)}
            style={{
                padding: "0.6rem 1.2rem",
                fontSize: "1rem",
                backgroundColor: "#804843", 
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
         }}
        > ← Back to Recipes </button>

      </div>
    </div>
  );
}
