import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = ({ foodItems }) => {
    const { type } = useParams();
    const filteredItems = foodItems.filter(item => item.cuisine === type);

    return (
        <div>
            <h2>{type} Cuisine</h2>
            <div className="food-list">
                {filteredItems.map(item => (
                    <div key={item.id} className="food-card">
                        <h3>{item.name}</h3>
                        <p>{item.cuisine}</p>
                        <p>{item.price}</p>
                        <p>Rating: {item.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;