const { Client } = require('pg');

module.exports = async (req, res) => {
    const client = new Client({
        // Your PostgreSQL connection details
        connectionString: process.env.DATABASE_URL,
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
        res.status(500).send('Error querying the database');
    } finally {
        await client.end();
    }
};
