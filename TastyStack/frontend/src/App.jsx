import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './Home';
import RegisterForm from './components/RegisterForm';
import Recipes from './pages/Recipes';
import Search from './pages/Search';
import Login from './components/LoginForm';
import RecipeDetail from './pages/RecipeDetail';
import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/favorites" element={<FavoriteRecipes />} />
    </Routes>
  );
}

export default App;
