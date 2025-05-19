'use client';
import classes from './page.module.css';
import Image from 'next/image';
// import { getMeal } from '@/lib/mymeals'; // mysql version
// import { getMeal } from '@/lib/meals'; // sqllite version
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function MealDetail({ params }) {
  // const meal = await getMeal(params.param);
  const [meal, setMeal] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log('params', params);
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('slug', params.param);
      if (error) console.error(error);
      else {
        const tmpMeal = data[0];
        tmpMeal.instructions = tmpMeal.instructions.replace(/\n/g, '<br />');
        setMeal(tmpMeal);
      }
    };
    fetchData();
  }, [params]);

  // ganti pesan error occured dengan closest not found page
  if (!meal) {
    notFound();
  }
  // meal.instructions = meal.instructions.replace(/\n/g, '<br />');
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
