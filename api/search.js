const { Client } = require('pg');

module.exports = async (req, res) => {
    const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
        ssl: {
            rejectUnauthorized: false
        }
    });

    await client.connect();

    const movieName = req.query.movieName;

    try {
        const result = await client.query('SELECT * FROM movies WHERE name LIKE $1', [`%${movieName}%`]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error querying the database');
    } finally {
        await client.end();
    }
};
