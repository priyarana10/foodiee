import React from 'react';
import './HomePage.css'
import { Link } from 'react-router-dom';

const HomePage = ({ foodItems, searchTerm, setSearchTerm, selectedCuisine, setSelectedCuisine, sortOrder, setSortOrder, cuisines }) => {
    return (
        <>

            <div className='main'>
                <div className="new">
                    <div className=" container nav">
                        <h2 className="logo">Foodie Wee..</h2>

                        <div className="nav-list">
                            <select value={selectedCuisine} onChange={e => setSelectedCuisine(e.target.value)}>
                                {cuisines.map(cuisine => (
                                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                                ))}
                            </select>

                            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                                <option value="low">Price: Low to High</option>
                                <option value="high">Price: High to Low</option>
                            </select>
                        </div>
                        <div className="search">
                            <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            <button className='click'>search</button>
                        </div>
                    </div>
                </div>



                <div className=" container-fluid food-list">
                    {foodItems.map(item => (
                        <div key={item.id} className="food-card">
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <div className=" container content">
                                <p>{item.cuisine}</p>
                                <p>Rating: {item.rating}</p>
                                <p>{item.price}</p>
                            </div>
                            <div className="linkss">
                                <Link to={`/food/${item.id}`}>View Details</Link></div>

                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default HomePage;

