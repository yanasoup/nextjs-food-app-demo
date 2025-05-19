import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/mymeals'; // mysql version
// import { getMeal } from '@/lib/meals'; // sqllite version
import { Suspense } from 'react';

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          makanan lezat, yang dibuat
          <span className={classes.highlight}> oleh anda</span>
        </h1>
        <p>
          Pilih resep favorit anda dan masaklah sendiri. sangat mudah dan
          menyenangkan!
        </p>
        <p className={classes.cta}>
          <Link href='/meals/share'>Bagikan Resep Favorit Anda</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
