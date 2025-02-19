import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "./About.css";

const FoodDetailsPage = ({ foodItems }) => {
  const { id } = useParams();
  const foodItem = foodItems ? foodItems.find(item => item.id === parseInt(id)) : " "; 

  if (!foodItem) {
    return <div>Food item not found.</div>;
  }

  return (
    <div className=" container food-details">
      <img src={foodItem.image} alt={foodItem.name} className="food-details-image" />
     
       <h2>{foodItem.name}</h2>
       <div className="content-detail">
      <p><strong>Cuisine:</strong> {foodItem.cuisine}</p>
        <p> <strong>Price:</strong> {foodItem.price}</p>
        <p><strong>Description:</strong>{foodItem.description}</p>
        <p><strong>Calories:</strong> {foodItem.calories}</p>
        <p> <strong>Ingredients:</strong> {foodItem.ingredients ? foodItem.ingredients.join(', ') : "Ingredients not available"}</p> 
        <div className="buttn">
        <button className="back" ><Link to="/">Go To Home Page</Link></button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;