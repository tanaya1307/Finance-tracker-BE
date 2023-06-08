const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'my_database',
    password: 'root',
    port: 5432,
  });

  async function updateBudget(req, res) {
    const { month, education, grocery, recreational, family, clothes } = req.body;
  
    try {
      const rowCount = await pool.query('SELECT COUNT(*) FROM budget WHERE month = $1', [month]);
      if (rowCount.rows[0].count === '0') {
        await pool.query(
          'INSERT INTO budget (month, education, grocery, recreational, family, clothes) VALUES ($1, $2, $3, $4, $5, $6)',
          [month, education, grocery, recreational, family, clothes]
        );
      } else {
        await pool.query(
          'UPDATE budget SET education = $2, grocery = $3, recreational = $4, family = $5, clothes = $6 WHERE month = $1',
          [month, education, grocery, recreational, family, clothes]
        );
      }
  
      res.status(200).json({ message: 'Budget updated successfully' });
    } catch (error) {
      console.error('Failed to update budget:', error);
      res.status(500).json({ error: 'Failed to update budget' });
    }
  }
module.exports={
    updateBudget
}  