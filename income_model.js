const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'my_database',
    password: 'root',
    port: 5432,
  });

  async function createIncome(req, res) {
    const { month, income } = req.body;
    const query = 'INSERT INTO incomes (month, income) VALUES ($1, $2) RETURNING *';
    const values = [month,income];
  
    try {
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Failed to create an income:', err);
      res.status(500).json({ error: 'Failed to create an income' });
    }
  }
  
  // Function to get all income records
  async function getIncomes (req, res)  {
    // Retrieve all rows from the incomes table
    pool.query('SELECT * FROM incomes', (error, results) => {
      if (error) {
        console.error('Failed to fetch incomes:', error);
        res.status(500).json({ error: 'Failed to fetch incomes' });
      } else {
        res.status(200).json(results.rows);
      }
    });
  };


  module.exports={
    getIncomes,
    createIncome
  }