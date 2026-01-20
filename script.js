/* ===================================
   Modern Calculator - JavaScript
   Professional Calculator Logic
   =================================== */

// ===== STATE MANAGEMENT =====
let currentDisplay = '0';
let previousDisplay = '';
let currentOperator = null;
let shouldResetDisplay = false;
let calculationHistory = [];

// ===== DOM ELEMENTS =====
const currentDisplayElement = document.getElementById('current-display');
const previousDisplayElement = document.getElementById('previous-display');
const historyPanel = document.getElementById('history-panel');
const historyList = document.getElementById('history-list');
const historyToggleBtn = document.getElementById('history-toggle');
const clearHistoryBtn = document.getElementById('clear-history');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeCalculator();
    loadHistoryFromStorage();
});

/**
 * Initialize calculator by setting up event listeners
 */
function initializeCalculator() {
    // Number buttons
    document.querySelectorAll('.btn-number').forEach(button => {
        button.addEventListener('click', () => {
            const number = button.dataset.number;
            if (number !== undefined) {
                appendNumber(number);
            } else if (button.dataset.action === 'decimal') {
                appendDecimal();
            }
        });
    });

    // Operator buttons
    document.querySelectorAll('.btn-operator').forEach(button => {
        button.addEventListener('click', () => {
            const operator = button.dataset.operator;
            if (operator) {
                setOperator(operator);
            } else if (button.dataset.action === 'percent') {
                calculatePercent();
            }
        });
    });

    // Function buttons
    document.querySelectorAll('.btn-function').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            handleFunctionAction(action);
        });
    });

    // Advanced function buttons
    document.querySelectorAll('.btn-advanced').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            handleAdvancedAction(action);
        });
    });

    // Equals button
    document.getElementById('btn-equals').addEventListener('click', calculate);

    // History toggle
    historyToggleBtn.addEventListener('click', toggleHistory);

    // Clear history
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Keyboard support
    document.addEventListener('keydown', handleKeyboardInput);
}

// ===== NUMBER INPUT =====

/**
 * Append a number to the current display
 * @param {string} number - The number to append
 */
function appendNumber(number) {
    if (shouldResetDisplay) {
        currentDisplay = number;
        shouldResetDisplay = false;
    } else {
        currentDisplay = currentDisplay === '0' ? number : currentDisplay + number;
    }
    updateDisplay();
}

/**
 * Append a decimal point to the current display
 */
function appendDecimal() {
    if (shouldResetDisplay) {
        currentDisplay = '0.';
        shouldResetDisplay = false;
    } else if (!currentDisplay.includes('.')) {
        currentDisplay += '.';
    }
    updateDisplay();
}

// ===== OPERATORS =====

/**
 * Set the current operator and prepare for next number
 * @param {string} operator - The operator to set (+, -, ×, ÷)
 */
function setOperator(operator) {
    if (currentOperator !== null && !shouldResetDisplay) {
        calculate();
    }

    currentOperator = operator;
    previousDisplay = currentDisplay + ' ' + operator;
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Calculate percentage of current number
 */
function calculatePercent() {
    const current = parseFloat(currentDisplay);
    currentDisplay = (current / 100).toString();
    updateDisplay();
}

// ===== CALCULATION =====

/**
 * Perform the calculation based on current operator
 */
function calculate() {
    if (currentOperator === null || shouldResetDisplay) return;

    const prev = parseFloat(previousDisplay);
    const current = parseFloat(currentDisplay);
    let result;

    switch (currentOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;

    // Add to history
    addToHistory(previousDisplay + ' ' + currentDisplay, result);

    // Update display
    previousDisplay = '';
    currentDisplay = result.toString();
    currentOperator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// ===== FUNCTION ACTIONS =====

/**
 * Handle function button actions (clear, delete, toggle)
 * @param {string} action - The action to perform
 */
function handleFunctionAction(action) {
    switch (action) {
        case 'clear':
            clear();
            break;
        case 'delete':
            deleteLastDigit();
            break;
        case 'toggle':
            toggleSign();
            break;
    }
}

/**
 * Clear all displays and reset calculator
 */
function clear() {
    currentDisplay = '0';
    previousDisplay = '';
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

/**
 * Delete the last digit from current display
 */
function deleteLastDigit() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateDisplay();
}

/**
 * Toggle the sign of the current number
 */
function toggleSign() {
    const current = parseFloat(currentDisplay);
    currentDisplay = (current * -1).toString();
    updateDisplay();
}

// ===== ADVANCED FUNCTIONS =====

/**
 * Handle advanced function actions (square, sqrt, reciprocal, pi)
 * @param {string} action - The action to perform
 */
function handleAdvancedAction(action) {
    const current = parseFloat(currentDisplay);
    let result;
    let expression;

    switch (action) {
        case 'square':
            result = current * current;
            expression = `${current}²`;
            break;
        case 'sqrt':
            if (current < 0) {
                alert('Cannot calculate square root of negative number!');
                return;
            }
            result = Math.sqrt(current);
            expression = `√${current}`;
            break;
        case 'reciprocal':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            result = 1 / current;
            expression = `1/${current}`;
            break;
        case 'pi':
            result = Math.PI;
            expression = 'π';
            break;
        default:
            return;
    }

    // Round result
    result = Math.round(result * 100000000) / 100000000;

    // Add to history
    addToHistory(expression, result);

    // Update display
    currentDisplay = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// ===== DISPLAY UPDATE =====

/**
 * Update the calculator display
 */
function updateDisplay() {
    currentDisplayElement.textContent = formatNumber(currentDisplay);
    previousDisplayElement.textContent = previousDisplay;

    // Trigger animation
    currentDisplayElement.style.animation = 'none';
    setTimeout(() => {
        currentDisplayElement.style.animation = 'displayPulse 0.3s ease';
    }, 10);
}

// ===== HISTORY MANAGEMENT =====

/**
 * Toggle history panel visibility
 */
function toggleHistory() {
    historyPanel.classList.toggle('active');
}

/**
 * Add calculation to history
 * @param {string} expression - The calculation expression
 * @param {number} result - The calculation result
 */
function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };

    calculationHistory.unshift(historyItem);

    // Limit history to 50 items
    if (calculationHistory.length > 50) {
        calculationHistory.pop();
    }

    saveHistoryToStorage();
    renderHistory();
}

/**
 * Render history items to the DOM
 */
function renderHistory() {
    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<p class="no-history">No calculations yet</p>';
        return;
    }

    historyList.innerHTML = calculationHistory.map((item, index) => `
        <div class="history-item" onclick="loadHistoryItem(${index})">
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">= ${item.result}</div>
        </div>
    `).join('');
}

/**
 * Load a history item back into the calculator
 * @param {number} index - The index of the history item
 */
function loadHistoryItem(index) {
    const item = calculationHistory[index];
    currentDisplay = item.result.toString();
    previousDisplay = '';
    currentOperator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Clear all history
 */
function clearHistory() {
    if (calculationHistory.length === 0) return;

    if (confirm('Are you sure you want to clear all history?')) {
        calculationHistory = [];
        saveHistoryToStorage();
        renderHistory();
    }
}

/**
 * Save history to localStorage
 */
function saveHistoryToStorage() {
    try {
        localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
    } catch (error) {
        console.error('Failed to save history:', error);
    }
}

/**
 * Load history from localStorage
 */
function loadHistoryFromStorage() {
    try {
        const stored = localStorage.getItem('calculatorHistory');
        if (stored) {
            calculationHistory = JSON.parse(stored);
            renderHistory();
        }
    } catch (error) {
        console.error('Failed to load history:', error);
        calculationHistory = [];
    }
}

// ===== KEYBOARD SUPPORT =====

/**
 * Handle keyboard input
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyboardInput(event) {
    const key = event.key;

    // Numbers
    if (key >= '0' && key <= '9') {
        event.preventDefault();
        appendNumber(key);
    }

    // Decimal point
    else if (key === '.') {
        event.preventDefault();
        appendDecimal();
    }

    // Operators
    else if (key === '+') {
        event.preventDefault();
        setOperator('+');
    }
    else if (key === '-') {
        event.preventDefault();
        setOperator('-');
    }
    else if (key === '*') {
        event.preventDefault();
        setOperator('×');
    }
    else if (key === '/') {
        event.preventDefault();
        setOperator('÷');
    }
    else if (key === '%') {
        event.preventDefault();
        calculatePercent();
    }

    // Actions
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    else if (key === 'Escape') {
        event.preventDefault();
        clear();
    }
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLastDigit();
    }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Format large numbers with commas
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
    if (num === null || num === undefined) return '';
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🧮 Modern Calculator', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cProfessional & Clean Design', 'font-size: 14px; color: #764ba2;');
console.log('%cKeyboard shortcuts: Numbers (0-9), Operators (+, -, *, /), Enter (=), Escape (AC), Backspace (DEL)', 'font-size: 12px; color: #888;');
