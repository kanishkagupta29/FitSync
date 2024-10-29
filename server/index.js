import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware setUp
app.use(cors());
app.use(bodyParser.json());

// Database information
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Load food data
const foodData = JSON.parse(fs.readFileSync('foodData.json'));

app.post('/calorie-log', (req, res) => {
    const { food, quantity } = req.body;
    const foodItem = foodData[0].Sheet1.find(item => item.Food.toLowerCase() === food.toLowerCase());

    if (foodItem) {
        const totalCalories = (foodItem.Calories * quantity)/foodItem.Serving;
        res.json({ food, quantity, totalCalories });
    } else {
        res.status(404).json({ error: "Food item not found" });
    }
});

app.post('/calorie-log-similar-foods', (req, res) => {
    const { food, quantity } = req.body;
    const foodItem = foodData[0].Sheet1.filter(item => item.Food.toLowerCase().includes(food.toLowerCase()));
    if (foodItem) {
        res.json({ foodItem });
    } else {
        res.status(404).json({ error: "Food item not found" });
    }
});

// Sign up 
app.post('/api/signup', async (req , res) => {
    let data = req.body;
    console.log('Data received:', data);
    try {
        const client = await pool.connect();
        const query2 = 'SELECT * FROM users WHERE username = $1';
        const values2 = [req.body["email"]];
        const result2 = await client.query(query2, values2);
        if (result2.rows.length > 0) {
            res.status(401).json({ message: "email already exists" });
        }
        else {
            const query = 'INSERT INTO users (username, passwords) VALUES ($1, $2)';
            const values = [req.body["email"], req.body["password"]];
            await client.query(query, values);
            res.status(200).json({ message: "Account created" });
        }
        client.release();
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).send('Internal server error');
    }
});

// Log In
app.post('/api/login', async(req,res) => {
    let data=req.data;
    try{
        const client = await pool.connect();
        const query = 'SELECT * FROM users WHERE username = $1';
        const value = req.body['email'];
        const result = await client.query(query, [value]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (user.passwords === req.body["password"]) {
                const token = jwt.sign(
                    { email: req.body["email"] },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.status(200).json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(401).json({ message: 'email not found' });
        }
        client.release();
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).send('Internal server error');
    }
});

//post personal info
app.post('/api/personalinfo', async (req , res) => {
    let data = req.body;
    console.log('Data received:', data);
    try {
        const client = await pool.connect();
            const query = 'INSERT INTO personaldetails (pname,age,gender,height,weight,goal) VALUES ($1, $2,$3,$4,$5,$6)';
            const values = [req.body["pname"], req.body["age"], req.body["gender"], req.body["height"], req.body["weight"], req.body["goal"]];
            await client.query(query, values);
            res.status(200).json({ message: "Account created" });
        client.release();
    } 
    catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/', (req, res) => {
    res.send('Server is working!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});