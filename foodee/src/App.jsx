import React, { useState, useEffect } from 'react';
import HomePage from './assets/HomePage/HomePage';
import CategoryPage from './assets/CategoryPage/CategoryPage';
import FoodDetailsPage from './assets/FoodDetailPage/FoodDeatailpage';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';
import foodData from './food_data.json'

const App = () => {
  const [foodItems, setFoodItems] = useState([foodData]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortOrder, setSortOrder] = useState('low');

  useEffect(() => {
    
    fetch('./food_data.json')
      .then(res => res.json())
      .then(data => setFoodItems(data))
      .catch(error => console.log("Error fetching data:", error));
  }, []);

  const filteredFoodItems = foodItems.filter(item =>(
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCuisine === 'All' || item.cuisine === selectedCuisine)
  ));

  const sortedFoodItems = [...filteredFoodItems].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', '')); 
    const priceB = parseFloat(b.price.replace('$', ''));
    return sortOrder === 'low' ? priceA - priceB : priceB - priceA;
  });

  const cuisines = ['All', ...new Set(foodItems?.map(item => item.cuisine) || [])];
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link>
          
          {cuisines.slice(1).map(cuisine => ( 
            <Link key={cuisine} to={`/category/${cuisine}`}>{cuisine}</Link>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage foodItems={sortedFoodItems} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} sortOrder={sortOrder} setSortOrder={setSortOrder} cuisines={cuisines} />} />
          <Route path="/category/:type" element={<CategoryPage foodItems={foodItems} />} />
          <Route path="/food/:id" element={<FoodDetailsPage foodItems={foodItems} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;