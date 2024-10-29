import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../styles/calorieLog.css';

function CalorieLog() {
    const [form, setForm] = useState({});
    const [calorie, setCalorie] = useState(0);
    const [similarFoods, setSimilarFoods] = useState([]);
    const [eatenItems, setEatenItems] = useState([]);
    const dropdownRef = useRef(null);

    function getEmailFromToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;
    
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken.email;
        } catch (error) {
          console.error('Failed to decode token:', error);
          return null;
        }
    }

    useEffect(() => {
        fetchFoodItems();
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSimilarFoods([]);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Cleanup
        };
    }, []);

    async function fetchFoodItems() {
        const email = getEmailFromToken();
        try {
            const result = await axios.get(`http://localhost:5000/calorie-log?email=${email}`);
            if (result.status === 200) {
                console.log(result.data);
                setEatenItems(result.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    function handleFormData(e) {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function addItem(e) {
        const email = getEmailFromToken();
        if (form.food && form.quantity) {
            try {
                const result = await axios.post('http://localhost:5000/calorie-log', {
                    ...form,
                    email
                });
                if (result.status === 200) {
                    setCalorie(result.data.totalCalories)
                    fetchFoodItems();
                    setSimilarFoods([])
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    async function searchItem(e) {
        if (form.food) {
            try {
                const result = await axios.post('http://localhost:5000/calorie-log-similar-foods', form);
                if (result.status === 200) {
                    const foods = result.data.foodItem.map(item => item.Food);
                    setSimilarFoods(foods);
                    console.log(foods);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const totalCalories = eatenItems.reduce((sum, item) => sum + Number(item.calories), 0);

    return (
        <div className='body-div'>
        <div className='main-div'>
            <div className='form'>
                <label>Food item: </label>
                <input
                    name='food'
                    onChange={handleFormData}
                    value={form.food}
                    placeholder='food item'
                ></input>
                {similarFoods.length > 0 && (
                    <div className='similar-foods-dropdown' ref={dropdownRef}>
                        {similarFoods.map((food, index) => (
                            <div key={index} className='food-item' onClick={() => {
                                setForm({ ...form, food });
                                setSimilarFoods([]);
                            }} >{food}</div>
                        ))}
                    </div>
                )}
                <button onClick={searchItem} className='search-btn'>Search</button>
                <br></br>
                <label>No. of servings: </label>
                <input
                    name='quantity'
                    onChange={handleFormData}
                    value={form.quantity}
                    placeholder='quantity'
                ></input>
                <br></br>
                <button onClick={addItem} className='add-btn'>Add item</button>
            </div>
            <div>Calories: {calorie}</div>
        </div>
        <div className='eaten-items'>
                {eatenItems.length > 0 ? (
                    <table className='eaten-items-table'>
                        <thead>
                            <tr>
                                <th>Food Item</th>
                                <th>Quantity</th>
                                <th>Calories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eatenItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.food_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.calories}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No items logged for today.</p>
                )}
            </div>
            <div className='calorie-summary'>Total calories consumed today: {totalCalories}</div>
        </div>
    );
}

export default CalorieLog;