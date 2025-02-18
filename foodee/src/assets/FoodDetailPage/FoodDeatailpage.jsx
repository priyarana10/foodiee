import React from 'react';
import { useParams } from 'react-router-dom';

const FoodDetailsPage = ({ foodItems }) => {
  const { id } = useParams();
  const foodItem = foodItems.find(item => item.id === parseInt(id)); 

  if (!foodItem) {
    return <div>Food item not found.</div>;
  }

  return (
    <div className="food-details">
      <img src={foodItem.image} alt={foodItem.name} className="food-details-image" />
      <h2>{foodItem.name}</h2>
      <p>Cuisine: {foodItem.cuisine}</p>
      <p>Price: {foodItem.price}</p>
      <p>Description: {foodItem.description}</p>
      <p>Ingredients: {foodItem.ingredients.join(', ')}</p>
      <p>Calories: {foodItem.calories}</p>
    </div>
  );
};
export default FoodDetailsPage
