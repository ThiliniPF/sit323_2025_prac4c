// Import the required modules
//const { parse } = require("dotenv");
const express = require("express");
const app = express();
const PORT = 3000;

// Starts the server and listens on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

// Function to validate input numbers
const validateNumbers = (num1, num2, res) => {

    // Checks if the numbers are valid and returns error message if not valid
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({error: "Invalid numbers provided."});
    }
    return null;
};

// Function to validate single numbers
const validateSingleNumber = (num, res) => {
    if (isNaN(num)) {
        return res.status(400).json({error: "Invalid number provided."});
    }
    return null;
};

// Addition Endpoint
app.get("/add", (req, res) => {
    // Gets the numbers from the query parameters
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Validates and returns the result as a JSON response
    if (validateNumbers(num1, num2, res)) return;
    res.json({result: num1 + num2});
});

// Subtraction Endpoint
app.get("/subtract", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(validateNumbers(num1, num2, res)) return;
    res.json({result: num1 - num2});
});

// Multiplication Endpoint
app.get("/multiplication", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(validateNumbers(num1, num2, res)) return;
    res.json({result: num1 * num2});
});

// Division Endpoint
app.get("/divide", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(validateNumbers(num1, num2, res)) return;

    // Checks if the number is zero and returns an error message if it is
    if(num2 == 0) { return res.status(400).json({error: "Cannot divide by zero."});}
    res.json({result: num1 / num2});
});

// Square Root Endpoint
app.get("/sqroot", (req, res) => {
    const num = parseFloat(req.query.num);
    if(validateSingleNumber(num, res)) return;
    
    // Check if the number is negative and returns an error message if it is
    if(num < 0) {
        return res.status(400).json({error: "Cannot compute square root of a negative number."});
    }
    res.json({result: Math.sqrt(num)});
})

// Modulo Endpoint
app.get("/modulo", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (validateNumbers(num1, num2, res)) return;
    if (num2 == 0) {
        return res.status(400).json({error: "Modulo by zero is undefined."});
    }
    res.json({result: num1 % num2});  
});

// Logorithmic Endpoint
app.get("/log", (req, res) => {
    const num = parseFloat(req.query.num);
    const base = req.query.base ? parseFloat(req.query.base) : 10;
    if (validateSingleNumber(num, res) || validateSingleNumber(base, res)) return;
    if (num <= 0 || base <= 0 || base === 1) {
        return res.status(400).json({error: "Invalid input for logarithm. Number and base must be positive, base cannot be 1."});
    }
    res.json({result: Math.log(num) / Math.log(base)});
});

// Exponential Endpoint
app.get("/exponent", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(validateNumbers(num1, num2, res)) return;
    res.json({result: Math.pow(num1, num2)});
});