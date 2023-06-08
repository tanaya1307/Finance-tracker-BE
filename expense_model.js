const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'my_database',
    password: 'root',
    port: 5432,
  });
  // Retrieve all expenses
  async function getExpenses(req, res) {
    try {
      const query = 'SELECT * FROM expenses';
      const result = await pool.query(query);
  
      const expenses = result.rows;
  
      res.status(200).json(expenses);
      console.log('Response:', res);
    } catch (err) {
      console.error('Failed to retrieve expenses:', err);
      res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
  }
  
  
  // Create a new expense
  async function createExpense(req, res) {
    const { expense, amount, description, tag } = req.body;
    const query = 'INSERT INTO expenses (expense, amount, description, tag) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [expense, amount, description, tag];
  
    try {
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Failed to create an expense:', err);
      res.status(500).json({ error: 'Failed to create an expense' });
    }
  }
  
  // Update an expense
  async function updateExpense(req, res) {
    const id = parseInt(req.params.id);
    const { expense, amount, description, tag } = req.body;
    const query = 'UPDATE expenses SET expense = $1, amount = $2, description = $3, tag = $4 WHERE id = $5';
    const values = [expense, amount, description, tag, id];
  
    try {
      const result = await pool.query(query, values);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Expense not found' });
      } else {
        res.json({ message: 'Expense updated successfully' });
      }
    } catch (err) {
      console.error('Failed to update an expense:', err);
      res.status(500).json({ error: 'Failed to update an expense' });
    }
  }
  
  // Delete an expense
  async function deleteExpense(req, res) {
    const id = parseInt(req.params.id);
    const query = 'DELETE FROM expenses WHERE id = $1';
    const values = [id];
  
    try {
      const result = await pool.query(query, values);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Expense not found' });
      } else {
        res.json({ message: 'Expense deleted successfully' });
      }
    } catch (err) {
      console.error('Failed to delete an expense:', err);
      res.status(500).json({ error: 'Failed to delete an expense' });
    }
  }
  async function getExpensesSum(req, res) {
    try {
      const query = 'SELECT SUM(amount) AS total_expenses FROM expenses;';
      const result = await pool.query(query);
  
      const totalExpenses = result.rows[0].total_expenses;
      res.json({ totalExpenses });
    } catch (error) {
      console.error('Failed to retrieve sum of expenses:', error);
      res.status(500).json({ error: 'Failed to retrieve sum of expenses' });
    }
  };
  
  module.exports = {
    getExpenses,
    createExpense,
    deleteExpense,
    updateExpense,
    getExpensesSum
  }