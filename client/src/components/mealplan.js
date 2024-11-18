import React,{useState,useEffect} from "react";
import axios from "axios";
import '../styles/mealplan.css';
import API_BASE_URL from "../apiconfig";
function Mealplan({getEmailFromToken}) {
    const [goalweight,setgoalweight]=useState("");

    useEffect(() => {
        async function fetchGoal() {
            const email = getEmailFromToken();
            if (!email) {
                console.log("Email not available");
                return;
            }
            try {
                const result = await axios.get(`${API_BASE_URL}/goal-weight?email=${email}`);
                if (result.status === 200) {
                    console.log(result.data);
                    setgoalweight(result.data);
                }
            } catch (error) {
                console.error('Error fetching goal weight:', error);
            }
        }

        fetchGoal();
    }, []); 
    const goal = goalweight;
    console.log("---->",goal);
   
    const mealPlanlose = [
        {
          day: "Day 1",
          meals: {
            breakfast: [
              "Oatmeal with a handful of berries, a dash of cinnamon, and a teaspoon of honey",
              "Greek yogurt parfait with banana slices, a sprinkle of nuts, and a bit of granola"
            ],
            lunch: [
              "Grilled chicken salad with mixed greens, tomatoes, and vinaigrette dressing",
              "Vegetable stir-fry with tofu or chickpeas, using carrots, bell peppers, and broccoli over brown rice"
            ],
            snack: [
              "Apple slices with a tablespoon of peanut butter",
              "Handful of nuts (almonds or walnuts) with cucumber sticks"
            ],
            dinner: [
              "Baked salmon with steamed broccoli and a small portion of quinoa",
              "Lentil soup with a side salad (lettuce, cucumber, and tomato)"
            ]
          }
        },
        {
          day: "Day 2",
          meals: {
            breakfast: [
              "Smoothie with spinach, banana, and almond milk",
              "Whole-grain toast with avocado slices and a boiled egg"
            ],
            lunch: [
              "Turkey and avocado lettuce wraps with a side of carrot sticks",
              "Quinoa and black bean bowl with mixed veggies"
            ],
            snack: [
              "Carrot sticks with hummus",
              "Greek yogurt with a few berries or a sprinkle of cinnamon"
            ],
            dinner: [
              "Stir-fried tofu with bell peppers, mushrooms, and a small serving of brown rice",
              "Baked chicken breast with roasted sweet potatoes and sautéed spinach"
            ]
          }
        },
        {
          day: "Day 3",
          meals: {
            breakfast: [
              "Scrambled eggs with spinach and a slice of whole-grain toast",
              "Overnight oats with almond milk, a few raisins, and chia seeds"
            ],
            lunch: [
              "Veggie wrap with hummus, cucumbers, bell peppers, and spinach",
              "Chickpea and veggie bowl with a lemon and olive oil dressing"
            ],
            snack: [
              "Sliced bell peppers with a spoonful of guacamole",
              "A handful of almonds and an orange"
            ],
            dinner: [
              "Grilled shrimp with roasted asparagus and a side of quinoa",
              "Vegetable soup with a side of whole-grain crackers"
            ]
          }
        },
        {
          day: "Day 4",
          meals: {
            breakfast: [
              "Chia pudding with coconut milk, topped with sliced strawberries",
              "Greek yogurt with oats, honey, and sliced apple"
            ],
            lunch: [
              "Lentil and veggie soup with a side salad",
              "Whole-grain wrap with turkey slices, lettuce, and mustard"
            ],
            snack: [
              "Carrot and cucumber sticks with hummus",
              "Small bowl of mixed fruit (apple, pear, or orange slices)"
            ],
            dinner: [
              "Grilled chicken breast with steamed green beans and wild rice",
              "Stir-fried tofu with cabbage, carrots, and sesame seeds"
            ]
          }
        },
        {
          day: "Day 5",
          meals: {
            breakfast: [
              "Avocado toast on whole-grain bread with chili flakes",
              "Smoothie bowl with banana, spinach, and oats"
            ],
            lunch: [
              "Quinoa salad with roasted veggies and chickpeas",
              "Lentil wrap with a side of sliced cucumbers"
            ],
            snack: [
              "Handful of trail mix with nuts, seeds, and a few raisins",
              "Apple slices with peanut or almond butter"
            ],
            dinner: [
              "Baked cod with roasted cauliflower and mixed greens",
              "Spaghetti squash with marinara sauce and roasted zucchini"
            ]
          }
        },
        {
          day: "Day 6",
          meals: {
            breakfast: [
              "Greek yogurt with berries and chia seeds",
              "Scrambled eggs with sautéed veggies (tomatoes, spinach, onions)"
            ],
            lunch: [
              "Tuna salad with mixed greens, cherry tomatoes, and a light dressing",
              "Brown rice bowl with steamed veggies and black beans"
            ],
            snack: [
              "Celery sticks with almond butter",
              "Boiled egg with salt and pepper"
            ],
            dinner: [
              "Chicken stir-fry with bell peppers, broccoli, and brown rice",
              "Zucchini noodles with marinara sauce and parmesan"
            ]
          }
        },
        {
          day: "Day 7",
          meals: {
            breakfast: [
              "Oatmeal with walnuts, cinnamon, and sliced apple",
              "Smoothie with almond milk, banana, frozen berries, and spinach"
            ],
            lunch: [
              "Mixed bean salad with cucumbers, tomatoes, and lemon vinaigrette",
              "Vegetable and hummus wrap with cherry tomatoes"
            ],
            snack: [
              "Handful of pumpkin seeds with a pear or apple",
              "Cottage cheese with sliced cucumber"
            ],
            dinner: [
              "Baked chicken breast with roasted carrots and greens",
              "Vegetable stew with a slice of whole-grain bread"
            ]
          }
        }
      ];
      
      const mealPlanmaintain = [
        {
          day: "Day 1",
          meals: {
            breakfast: [
              "Oatmeal with a handful of sliced bananas and a sprinkle of cinnamon",
              "Whole-grain toast with peanut butter and a side of apple slices"
            ],
            lunch: [
              "Turkey and cheese sandwich on whole-grain bread with lettuce and tomato",
              "Veggie stir-fry with mixed vegetables (bell peppers, carrots, broccoli) over a small portion of rice"
            ],
            snack: [
              "Greek yogurt with a few slices of strawberries",
              "Handful of mixed nuts and a small orange"
            ],
            dinner: [
              "Grilled chicken with a baked sweet potato and a side of steamed green beans",
              "Lentil soup with a side salad (lettuce, cucumber, and cherry tomatoes)"
            ]
          }
        },
        {
          day: "Day 2",
          meals: {
            breakfast: [
              "Smoothie with banana, spinach, and almond milk",
              "Scrambled eggs with a slice of whole-grain toast"
            ],
            lunch: [
              "Tuna salad wrap with lettuce and cucumber in a whole-grain wrap",
              "Quinoa bowl with chickpeas, cherry tomatoes, and a light vinaigrette"
            ],
            snack: [
              "Carrot and celery sticks with hummus",
              "Sliced apple with a small amount of almond butter"
            ],
            dinner: [
              "Baked salmon with a side of steamed broccoli and a small portion of brown rice",
              "Vegetable pasta with marinara sauce and a sprinkle of parmesan"
            ]
          }
        },
        {
          day: "Day 3",
          meals: {
            breakfast: [
              "Greek yogurt parfait with a sprinkle of granola and mixed berries",
              "Avocado toast with a sprinkle of chili flakes and a boiled egg on the side"
            ],
            lunch: [
              "Grilled chicken salad with mixed greens, cucumbers, and a light dressing",
              "Veggie wrap with hummus, bell peppers, cucumbers, and spinach"
            ],
            snack: [
              "A handful of trail mix with nuts and dried fruits",
              "Sliced bell peppers with guacamole"
            ],
            dinner: [
              "Shrimp stir-fry with mixed veggies (carrots, zucchini, snap peas) and quinoa",
              "Eggplant and zucchini lasagna with a side salad"
            ]
          }
        },
        {
          day: "Day 4",
          meals: {
            breakfast: [
              "Overnight oats with almond milk, chia seeds, and a few raisins",
              "Smoothie bowl with banana, berries, and a sprinkle of oats"
            ],
            lunch: [
              "Chicken wrap with lettuce, tomatoes, and a light dressing",
              "Chickpea and veggie salad with cucumbers, bell peppers, and a lemon vinaigrette"
            ],
            snack: [
              "Handful of almonds with a small piece of dark chocolate",
              "Pear or apple slices with a small portion of cheese"
            ],
            dinner: [
              "Baked cod with roasted carrots and a side of couscous",
              "Stir-fried tofu with mixed veggies and a portion of brown rice"
            ]
          }
        },
        {
          day: "Day 5",
          meals: {
            breakfast: [
              "Whole-grain toast with avocado slices and a dash of salt and pepper",
              "Smoothie with spinach, pineapple, and yogurt"
            ],
            lunch: [
              "Vegetable stir-fry with tofu and a small portion of rice",
              "Whole-grain pasta salad with cherry tomatoes, olives, and a light dressing"
            ],
            snack: [
              "Greek yogurt with a few nuts and a drizzle of honey",
              "Mixed vegetable sticks (cucumber, bell pepper, carrots) with hummus"
            ],
            dinner: [
              "Baked chicken breast with roasted zucchini and mashed potatoes",
              "Vegetable and bean stew with a slice of whole-grain bread"
            ]
          }
        },
        {
          day: "Day 6",
          meals: {
            breakfast: [
              "Chia pudding with coconut milk and a topping of sliced mango",
              "Scrambled eggs with a side of sliced tomatoes and whole-grain toast"
            ],
            lunch: [
              "Grilled turkey and cheese sandwich on whole-grain bread",
              "Spinach and chickpea salad with bell peppers and cucumbers"
            ],
            snack: [
              "Celery sticks with almond butter",
              "Boiled egg with a sprinkle of salt and pepper"
            ],
            dinner: [
              "Baked tilapia with a side of steamed vegetables and a small serving of rice",
              "Vegetable curry with chickpeas and a small portion of basmati rice"
            ]
          }
        },
        {
          day: "Day 7",
          meals: {
            breakfast: [
              "Oatmeal with a few walnuts, a dash of cinnamon, and sliced pear",
              "Whole-grain toast with cottage cheese and a side of sliced oranges"
            ],
            lunch: [
              "Chicken Caesar wrap in a whole-grain tortilla",
              "Vegetable and lentil soup with a side of whole-grain crackers"
            ],
            snack: [
              "Handful of pumpkin seeds and a banana",
              "Cottage cheese with cucumber slices"
            ],
            dinner: [
              "Grilled chicken thigh with roasted sweet potatoes and a side of sautéed spinach",
              "Minestrone soup with a slice of whole-grain bread"
            ]
          }
        }
      ];
      const mealPlangain = [
        {
          day: "Day 1",
          meals: {
            breakfast: [
              "Peanut butter banana smoothie (2 bananas, 2 tablespoons peanut butter, whole milk)",
              "Oatmeal with whole milk, topped with nuts and honey"
            ],
            lunch: [
              "Chicken and avocado sandwich on whole-grain bread with cheese",
              "Quinoa salad with chickpeas, feta cheese, and olive oil"
            ],
            snack: [
              "Trail mix (nuts, seeds, dried fruits, chocolate chips)",
              "Greek yogurt with granola and honey"
            ],
            dinner: [
              "Grilled salmon with a side of quinoa and roasted vegetables",
              "Pasta with creamy sauce (alfredo or pesto) and grilled chicken"
            ]
          }
        },
        {
          day: "Day 2",
          meals: {
            breakfast: [
              "Avocado toast with poached eggs and a sprinkle of cheese",
              "Chia seed pudding made with whole milk and topped with fruits"
            ],
            lunch: [
              "Meatball sub on a hoagie roll with marinara sauce and cheese",
              "Rice bowl with teriyaki chicken, vegetables, and avocado"
            ],
            snack: [
              "Nut butter rice cakes topped with banana slices",
              "Cottage cheese with pineapple chunks"
            ],
            dinner: [
              "Steak or beef stir-fry with broccoli and bell peppers, served over rice",
              "Baked potatoes topped with cheese, sour cream, and bacon bits"
            ]
          }
        },
        {
          day: "Day 3",
          meals: {
            breakfast: [
              "Smoothie bowl with whole milk, oats, nuts, and fruits",
              "French toast made with whole-grain bread, topped with syrup and fruits"
            ],
            lunch: [
              "Tuna salad sandwich with mayonnaise, served with chips",
              "Vegetable and cheese quesadilla with guacamole"
            ],
            snack: [
              "Peanut butter energy balls (peanut butter, oats, honey, chocolate chips)",
              "Granola bars or protein bars"
            ],
            dinner: [
              "Stuffed bell peppers with ground beef, rice, and cheese",
              "Creamy chicken casserole with pasta and mixed vegetables"
            ]
          }
        },
        {
          day: "Day 4",
          meals: {
            breakfast: [
              "Scrambled eggs with cheese and a side of toast with butter",
              "Bagel with cream cheese and smoked salmon"
            ],
            lunch: [
              "Curry with chickpeas served with rice and naan bread",
              "Bacon and egg sandwich on a bagel or croissant"
            ],
            snack: [
              "Chocolate milkshake made with whole milk and ice cream",
              "Cheese and crackers"
            ],
            dinner: [
              "Pork chops with mashed potatoes and gravy",
              "Vegetable lasagna with a side of garlic bread"
            ]
          }
        },
        {
          day: "Day 5",
          meals: {
            breakfast: [
              "Pancakes with maple syrup, topped with berries and whipped cream",
              "Yogurt parfait with granola, nuts, and honey"
            ],
            lunch: [
              "BBQ chicken wrap with cheese, lettuce, and ranch dressing",
              "Pasta salad with olive oil, cheese, and salami"
            ],
            snack: [
              "Hard-boiled eggs with a sprinkle of salt",
              "Avocado dip with tortilla chips"
            ],
            dinner: [
              "Chili with beans, served with cornbread",
              "Fried rice with eggs, vegetables, and shrimp or chicken"
            ]
          }
        },
        {
          day: "Day 6",
          meals: {
            breakfast: [
              "Breakfast burrito with eggs, cheese, and beans wrapped in a tortilla",
              "Fruit smoothie with protein powder, oats, and nut butter"
            ],
            lunch: [
              "Stuffed pita with falafel, tahini, and salad",
              "Cobb salad with chicken, bacon, cheese, and avocado"
            ],
            snack: [
              "Rice pudding with cinnamon and raisins",
              "Fruit and nut energy bars"
            ],
            dinner: [
              "Creamy garlic chicken with fettuccine and broccoli",
              "Vegetarian curry with coconut milk, served with rice"
            ]
          }
        },
        {
          day: "Day 7",
          meals: {
            breakfast: [
              "Omelet with cheese, ham, and vegetables",
              "Waffles with peanut butter and sliced bananas"
            ],
            lunch: [
              "Grilled cheese sandwich with tomato soup",
              "Pasta primavera with a variety of vegetables and olive oil"
            ],
            snack: [
              "Popcorn topped with butter and nutritional yeast",
              "Milkshake with protein powder and ice cream"
            ],
            dinner: [
              "Roasted chicken with sweet potatoes and green beans",
              "Beef tacos with cheese, guacamole, and sour cream"
            ]
          }
        }
      ];
      
      let mealPlan = null;

// Assuming 'goal' is defined somewhere in your code
console.log(goal);
if (goal && goal.goal === "lose weight") {
  mealPlan = mealPlanlose;
} else if (goal && goal.goal === "maintain weight") {
  mealPlan = mealPlanmaintain;
} else if (goal && goal.goal === "gain weight") {
  mealPlan = mealPlangain;
}
      

return (
    <section className="meal-plan">
        <h3 className="heading">Your Goal Is: {goal?.goal}</h3>
        <h5 className="heading">Suggested meal plan according to your goal:</h5>
        {mealPlan && mealPlan.map((dayPlan, index) => (
            <div key={index} className="day-plan">
                <h6 className="day">{dayPlan.day}</h6>
                <div className="meals">
                    <div className="meal">
                        <strong>Breakfast Options:</strong>
                        <ul>
                            {dayPlan.meals.breakfast.map((option, i) => (
                                <li key={i}>{option}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="meal">
                        <strong>Lunch Options:</strong>
                        <ul>
                            {dayPlan.meals.lunch.map((option, i) => (
                                <li key={i}>{option}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="meal">
                        <strong>Snack Options:</strong>
                        <ul>
                            {dayPlan.meals.snack.map((option, i) => (
                                <li key={i}>{option}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="meal">
                        <strong>Dinner Options:</strong>
                        <ul>
                            {dayPlan.meals.dinner.map((option, i) => (
                                <li key={i}>{option}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        ))}
    </section>
);
}

export default Mealplan;
