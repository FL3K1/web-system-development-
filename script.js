// Select DOM elements
const expenseNameInput = document.querySelector('[name="expense-name"]');
const expenseAmountInput = document.querySelector('[name="expense-amount"]');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const totalElement = document.getElementById('total');

let expenses = []; // store all expense objects

// Function to render expenses in the list
function renderExpenses() {
  expenseList.innerHTML = ''; // clear previous list
  let total = 0;

  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
    expenseList.appendChild(li);
    total += expense.amount;
  });

  totalElement.textContent = total.toFixed(2);
}

// Event listener for the button
addExpenseButton.addEventListener('click', () => {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  // Validate inputs
  if (name === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid expense name and positive amount.');
    return;
  }

  // Add new expense to array
  expenses.push({ name, amount });

  // Clear inputs
  expenseNameInput.value = '';
  expenseAmountInput.value = '';

  // Render updated list and total
  renderExpenses();
});
