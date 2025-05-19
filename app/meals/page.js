'use client';
import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
// import { getMeals } from '@/lib/mymeals'; // mysql version
// import { getMeal } from '@/lib/meals'; // sqllite version
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

async function Meals() {
  // const meals = await getMeals();
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('meals').select('*');
      if (error) console.error(error);
      else setMeals(data);
    };
    fetchData();
  }, []);

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
