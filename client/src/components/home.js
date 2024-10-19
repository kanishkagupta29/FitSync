import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <section className="header">
                <div className='logo'>FitSync</div>
                <div className='buttons'>
                    <button onClick={() => navigate('/signup')}>Sign Up</button>
                    <button onClick={() => navigate('/login')}>Log In</button>
                </div>
            </section>
            <section className="home">
                <div className='hero-image'></div>
                <div className='hero-content'>
                    <h1>Welcome to FitSync</h1>
                    <br></br>
                    <p>
                        Achieve your fitness goals with personalized diet plans, accurate calorie tracking, and exercise routines tailored just for you. FitSync is here to guide your journey toward a healthier, fitter you. Let’s sync up and get started!
                    </p>
                </div>
            </section>

            <section className="benefits">
                <h2>Why Choose Fitsync?</h2>
                <div className="benefit-cards">
                    <div className="benefit-card">
                        <h3>Calorie tracking</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, eius?</p>
                    </div>
                    <div className="benefit-card">
                        <h3>Personalised exercise plans</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="benefit-card">
                        <h3>personalized diet plans</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
            </section>

            <footer>
                <div class="footer-container">
                    <div class="footer-column">
                        <h3>About FitSync</h3>
                        <p>FitSync is your go-to platform for personalized diet plans, calorie tracking, and tailored exercise suggestions to help you stay on track!</p>
                    </div>
                    <div class="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Follow Us</h3>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 FitSync. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    );
}

export default Home;
