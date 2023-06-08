const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'my_database',
    password: 'root',
    port: 5432,
  });

async function createGoal(req, res){
    try {
      const { goal, requiredBudget, savedSum } = req.body;
  
      // Insert the goal into the goals table
      const newGoal = await pool.query(
        'INSERT INTO goals (goal, required_budget, saved_sum) VALUES ($1, $2, $3) RETURNING *',
        [goal, requiredBudget, savedSum]
      );
  
      res.status(201).json(newGoal.rows[0]); // Return the newly created goal
    } catch (error) {
      console.error('Failed to create goal:', error);
      res.status(500).json({ error: 'Failed to create goal' });
    }
  };

  async function getGoals (req, res)  {
    // Retrieve all rows from the goals table
    pool.query('SELECT * FROM  goals', (error, results) => {
      if (error) {
        console.error('Failed to fetch goals:', error);
        res.status(500).json({ error: 'Failed to fetch goals' });
      } else {
        res.status(200).json(results.rows);
      }
    });
  };
async function updateGoal (req,res) {
  const itemId = req.params.id;
  const amount = req.body.amount;

  // Perform the database update
  const query = 'UPDATE goals SET saved_sum = saved_sum + $1 WHERE id = $2';

  pool
    .query(query, [amount, itemId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Failed to update goal:', error);
      res.sendStatus(500);
    });
};
  module.exports={
   createGoal,
   getGoals,
    updateGoal
  }