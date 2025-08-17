import './App.css';
import foodImage from './assets/food.jpg'; // high-quality background image
import { Link,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus =='true');
  },[]);

  const handleGetStarted = ()=>{
    navigate('/register');
  };
    return (
    <div className="hero-section" style={{ backgroundImage: `url(${foodImage})` }}>
      <div className="overlay">
        <h1 className='title'>Welcome to TastyStack 🍽️</h1>
        <p className='tagline'>“Where devs and chefs share taste.”</p>

        <div className='text-section'>
          <p className='subheading'>From Code to Kitchen 👩‍🍳🍝</p>
          <p className='description'>
            TastyStack blends great taste and smart design. Share your signature dishes,
            explore new favorites, and keep your personal cookbook in the cloud.
          </p>
        </div>

        <div className='button-group'>
          {isLoggedIn?(
            <>
             <Link to="/search"><button>Search</button></Link>
              <Link to="/recipes"><button>View Menu</button></Link>
              <button onClick={() => {
                localStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
              }}>Logout</button>
            </>
          ):(
             <button onClick={handleGetStarted}>Get Started</button>
          )}
          
        </div>
        </div>
    </div>
    );
    
}