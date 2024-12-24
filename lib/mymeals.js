import mysql from 'mysql2/promise';

export async function getMeals() {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Query the database
    const [rows] = await connection.query('SELECT * FROM meals');

    // Close the connection
    await connection.end();
    // console.log('rows', [rows]);

    return rows;
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
}

export async function getMeal(slug) {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Query the database
    const [row] = await connection.query('SELECT * FROM meals where slug=?', [
      slug,
    ]);

    // Close the connection
    await connection.end();

    // console.log('row', row[0]);
    return row[0];
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
}
