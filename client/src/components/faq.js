import React, { useState } from 'react';
import '../styles/faq.css';  // Import CSS file for styling

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null); // To track the active question

    const toggleAnswer = (index) => {
        // Toggle the visibility of the answer when a question is clicked
        if (activeIndex === index) {
            setActiveIndex(null); // If it's already open, close it
        } else {
            setActiveIndex(index); // Otherwise, open the clicked question's answer
        }
    };

    const faqData = [
        {
            question: "How do I log my food and calories?",
            answer: "To log your food, go to the Calories Log page and enter the food items you ate. We will automatically calculate the calories based on the food database."
        },
        {
            question: "How does the workout recommendation work?",
            answer: "Your workout plan is tailored based on the goal you select during signup. It will recommend exercises that align with your fitness objectives."
        },
        {
            question: "How does the progress tracker work?",
            answer: "The progress tracker allows you to track your total calories consumed on each date. You can view your progress by clicking on any date in the calendar."
        },
        {
            question: "What are daily goals?",
            answer: "Daily goals include tracking your calories consumed, your water intake, and your meal plan based on your fitness goal."
        },
        {
            question: "How are meal plans generated?",
            answer: "Meal plans are automatically generated based on the goal you select (e.g., weight loss, weight gain. etc). We recommend foods that align with your calorie intake and nutritional needs."
        }
    ];

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            <div className="faq-list">
                {faqData.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <div className="faq-question" onClick={() => toggleAnswer(index)}>
                            <h3>{faq.question}</h3>
                            <span className="arrow">{activeIndex === index ? '▲' : '▼'}</span>
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
