import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div>
             <div className="dashboard-header">
                {/* <Sidebar setActiveFeature={setActiveFeature} /> */}
                {/* Logo Section */}
                <div className="dash-logo-container">
                    <img src="https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/haalxf8hs7fk9m41uwnu" alt="FitSync Logo" className="fitsync-logo" />
                    <div className='dash-logo'>FitSync</div>
                </div>
                {/* Navigation Links */}
                <div className="nav-links">
                    <a href="/about-us" className="nav-link">About Us</a>
                    <a href="/contact" className="nav-link">Contact</a>
                    <a href="/subscription" className="nav-link subscription-link">Subscription</a>
                    <a href="/signup" className="nav-link">SignUp</a>
                    <a href="/login" className="nav-link">Login</a>
                </div>
                {/* <a href="/dashboard"><i className="fa-solid fa-user profile-logo"></i></a> */}
            </div>
            <div style={{height:'15px',backgroundColor:'#40A578'} }></div>
            <section className="home">
                <div className='quote'>Sync your life, fuel your journey, achieve your best self.</div>
                <div className='hero-image'></div>
               
            </section>

            <section className="benefits">
            <div className='hero-content'>
                    <h1>Welcome to FitSync</h1>
                    <br></br>
                    <p>
                        Achieve your fitness goals with personalized diet plans, accurate calorie tracking, and exercise routines tailored just for you. FitSync is here to guide your journey toward a healthier, fitter you. Let’s sync up and get started!
                    </p>
                </div>
                <h2>Why Choose Fitsync?</h2>
                <div className="benefit-cards">
                    <div className="benefit-card">
                        <h3>Calorie tracking</h3>
                        <p>Effortlessly track your calories to stay on top of your nutrition goals and maintain a balanced lifestyle</p>
                    </div>
                    <div className="benefit-card">
                        <h3>Personalised exercise plans</h3>
                        <p>Get tailored exercise routines that align with your fitness goals, helping you stay active and motivated</p>
                    </div>
                    <div className="benefit-card">
                        <h3>Personalized diet plans</h3>
                        <p>Receive customized diet plans that suit your preferences and help you achieve your health and fitness objectives</p>
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
