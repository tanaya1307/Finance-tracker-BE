const express = require('express')

const app = express()


const port = 8000
const expense_model = require('./expense_model')
const income_model = require('./income_model')
const goal_model=require('./goal_model')
const budget_model=require('./budget_model')

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

  app.get('/', expense_model.getExpenses);
  
  app.post('/expenses',expense_model.createExpense);
  
  app.delete('/expenses/:id', expense_model.deleteExpense);

  app.get('/expenses/sum',expense_model.getExpensesSum);

  app.post('/incomes', income_model.createIncome);

  app.get('/incomes', income_model.getIncomes);
  
  app.get('/goals', goal_model.getGoals);

  app.post('/goals', goal_model.createGoal);

  app.post('/goals/:id', goal_model.updateGoal)
  
  app.post('/budget',budget_model.updateBudget)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))