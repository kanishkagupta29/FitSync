import React from "react";
import "../styles/aboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About FitSync</h1>
        <p>
          FitSync is your trusted partner in achieving a balanced lifestyle through personalized health tracking,
          fitness routines, and nutrition guidance. We are dedicated to making wellness accessible, achievable, and enjoyable for everyone.
        </p>
      </header>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission at FitSync is to empower individuals by providing intuitive tools for tracking health metrics, 
          setting fitness goals, and building sustainable habits. We strive to support your journey with personalized plans, 
          whether you’re looking to manage weight, enhance athletic performance, or improve overall wellness.
        </p>
        <p>
          By integrating the latest in fitness and nutrition science, we make it easy to set achievable goals and monitor your progress 
          over time. With features that cater to beginners and seasoned athletes alike, FitSync is built to help everyone create lasting, 
          positive changes in their lives.
        </p>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          At FitSync, we envision a world where health and wellness are seamlessly integrated into daily life, creating a society that prioritizes well-being. 
          We believe in harnessing technology to deliver a personalized, holistic approach to health, allowing individuals to manage their fitness, nutrition, 
          and lifestyle from a single platform.
        </p>
        <p>
          FitSync is committed to being more than just a tracking app—we aim to inspire a movement towards mindfulness, balanced living, 
          and community support. Our vision is to foster a global community of health-conscious individuals who are empowered to take charge 
          of their own wellness journeys.
        </p>
      </section>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Innovation:</strong> We constantly evolve to provide cutting-edge tools that adapt to the latest in fitness and nutrition science.</li>
          <li><strong>Empowerment:</strong> We believe in equipping individuals with the knowledge and tools to achieve their wellness goals.</li>
          <li><strong>Community:</strong> We foster a supportive community where users can share experiences, gain insights, and encourage each other.</li>
          <li><strong>Integrity:</strong> Your data privacy and trust are paramount to us. We are committed to maintaining transparency in all our practices.</li>
          <li><strong>Well-being:</strong> Our primary focus is helping you lead a happier, healthier life through comprehensive fitness and nutrition support.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
