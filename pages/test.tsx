import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
};

const item = {
    hidden: { x: 100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1
    }
};

const request = `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`;

function Test() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
            const response = await fetch(request);
            const data = await response.json();
            setRecipes(data.meals);
            console.log(data.meals);
        };
        getRecipes();
    }, []);

    return (
        <div className="App">
            <motion.ul
                variants={container}
                initial="hidden"
                animate={recipes.length > 0 && "visible"}
            >
                {recipes.map(recipe => (
                    <motion.li key={recipe.idMeal} variants={item}>
                        <div className="p-2 bg-red-400">{recipe.strMeal}</div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}

export default Test;
