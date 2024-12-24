import classes from './meals-grid.module.css';
import MealItem from './meal-item';

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => {
        return (
          <li key={meal.id}>
            <MealItem key={meal.id} {...meal} />
          </li>
        );
      })}
    </ul>
  );
}
