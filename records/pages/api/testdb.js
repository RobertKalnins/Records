// pages/api/testdb.js
const pool = require('../../lib/db');

export default async function handler(req, res) {
	  try {
		      const { rows } = await pool.query('SELECT NOW()');
		      res.status(200).json({ time: rows[0] });
		    } catch (err) {
			        console.error(err);
			        res.status(500).json({ error: 'Error connecting to database' });
			      }
}
