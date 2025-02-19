import React, { useState, useEffect } from 'react';
import HomePage from './assets/HomePage/HomePage';
import CategoryPage from './assets/CategoryPage/CategoryPage';
import About from './assets/About/About';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import './App.css';
import foodData from './food_data.json';

const filterFoodItems = (foodItems, searchTerm, selectedCuisine) => {
  if (!foodItems) { 
    return [ ];
  }
  return foodItems.filter(item => {
    const itemNameLower = item.name ? item.name.toLowerCase() : ""; 
    return (
      itemNameLower.includes(searchTerm.toLowerCase()) &&
      (selectedCuisine === 'All' || item.cuisine === selectedCuisine)
    );
  });
};

const App = () => {
  const [foodItems, setFoodItems] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortOrder, setSortOrder] = useState('low');

  useEffect(() => {
    setFoodItems(foodData); 
  }, []);

  const filteredFoodItems = foodItems ? filterFoodItems(foodItems, searchTerm, selectedCuisine) : []; 

  const sortedFoodItems = [...filteredFoodItems].sort((a, b) => {
    const priceA = a.price ? parseFloat(a.price.replace('$', '')) : 0; 
    const priceB = b.price ? parseFloat(b.price.replace('$', '')) : 0;
    return sortOrder === 'low' ? priceA - priceB : priceB - priceA;
  });

  const cuisines = ['All', ...new Set(foodItems ? foodItems.map(item => item.cuisine) : [])];
  return (
    <Router>
      <div className="app-container">

        <Routes>
          <Route path="/" element={<HomePage 
            foodItems={sortedFoodItems} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            selectedCuisine={selectedCuisine} 
            setSelectedCuisine={setSelectedCuisine} 
            sortOrder={sortOrder} 
            setSortOrder={setSortOrder} 
            cuisines={cuisines} 
          />} />
          <Route path="/category/:type" element={<CategoryPage foodItems={foodItems} />} />
          <Route path="/food/:id" element={<About foodItems={foodItems} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;