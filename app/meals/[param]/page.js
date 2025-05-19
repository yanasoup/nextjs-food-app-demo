import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/mymeals'; // mysql version
// import { getMeal } from '@/lib/meals'; // sqllite version
import { notFound } from 'next/navigation';

export default async function MealDetail({ params }) {
  const meal = await getMeal(params.param);

  // ganti pesan error occured dengan closest not found page
  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <section className={classes.customContainer}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </section>
    </>
  );
}
