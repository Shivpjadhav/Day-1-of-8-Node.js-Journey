const fs = require('fs'); //commonjs module system

const command = process.argv[2]; //get 2 number arg from command line

function loadExpenses() {
    const dataBuffer = fs.readFileSync('expenses.json'); // sycan file and add data
    const dataJSON = dataBuffer.toString(); // convert data into string
    return JSON.parse(dataJSON); // return string in json format
}

function saveExpenses(expenses) { // save data in json file
    const dataJSON = JSON.stringify(expenses, null, 2); // convert data into string and format it with 2 spaces for better readability
    fs.writeFileSync('expenses.json', dataJSON);// write data to file
}
function addExpense(amount, category) { // add new expense
    const expenses = loadExpenses(); // load existing expenses

    const newExpense = {// create new expense object
        id: Date.now(),
        amount: Number(amount),
        category: category,
        date: new Date().toLocaleString()
    };

    expenses.push(newExpense); // add new expense to array

    saveExpenses(expenses); // save updated expenses back to file

    console.log("✅ Expense added successfully!");
}
if (command === 'add') {
    const amount = process.argv[3];// get amount from command line
    const category = process.argv[4]; // get category from command line

    if (!amount || !category) {
        console.log("⚠ Please provide amount and category.");
        return;
    }

    addExpense(amount, category);// call addExpense function
}
function listExpenses() {
    const expenses = loadExpenses();// load existing expenses

    if (expenses.length === 0) { 
        console.log("No expenses found.");
        return;
    }

    console.log("📋 Your Expenses:");
    expenses.forEach(exp => {
        console.log(`${exp.id} | ₹${exp.amount} | ${exp.category} | ${exp.date}`); // display each expense in a formatted way
    });
}
if (command === 'list') {
    listExpenses(); // call listExpenses function
}
function calculateTotal() {
    const expenses = loadExpenses(); // load existing expenses

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);// calculate total by summing up all expense amounts

    console.log("💰 Total Expense: ₹" + total);
}
if (command === 'total') {
    calculateTotal();// call calculateTotal function
}
function deleteExpense(id) {
    let expenses = loadExpenses(); // load existing expenses

    const filteredExpenses = expenses.filter(exp => exp.id != id);// filter out the expense with the given id
    if (expenses.length === filteredExpenses.length) { // check if any expense was deleted
        console.log("❌ Expense not found.");
        return;
    }

    saveExpenses(filteredExpenses);// save updated expenses back to file
    console.log("🗑 Expense deleted successfully!");
}
if (command === 'delete') { // check if command is delete
    const id = process.argv[3]; // get id from command line
    deleteExpense(id);// call deleteExpense function
}
console.log(command); 