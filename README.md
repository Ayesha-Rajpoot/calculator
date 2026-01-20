# Modern Calculator - Professional & Clean Design

A fully functional, visually stunning calculator web application featuring modern glassmorphism design, smooth animations, and comprehensive functionality.

## ✨ Features

### 🎨 Premium Visual Design
- **Glassmorphism Effect**: Beautiful frosted glass appearance with backdrop blur
- **Animated Gradient Background**: Smooth, continuously shifting gradient colors
- **Micro-animations**: Button press effects, ripple animations, and smooth transitions
- **Glowing Effects**: Special buttons feature attractive glow effects
- **Modern Typography**: Clean Poppins font from Google Fonts

### 🧮 Calculator Functionality
- **Basic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Advanced Functions**:
  - Percentage (%)
  - Square (x²)
  - Square Root (√x)
  - Reciprocal (1/x)
  - Pi (π)
- **Additional Features**:
  - Toggle sign (+/−)
  - Decimal point support
  - Clear (AC) and Delete (DEL) functions
  - Error handling for invalid operations

### ⌨️ Keyboard Support
- **Numbers**: 0-9
- **Operators**: +, -, *, /
- **Special Keys**:
  - Enter or = : Calculate result
  - Escape : Clear calculator
  - Backspace : Delete last digit
  - % : Percentage
  - . : Decimal point

### 📊 Calculation History
- View all past calculations
- Click any history item to load the result
- Persistent storage using localStorage
- Clear history option
- Stores up to 50 recent calculations

### 📱 Fully Responsive
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: 360px - 480px
  - Tablet: 481px - 768px
  - Desktop: 769px and above
- Touch-friendly button sizes
- Adaptive layout for all screen sizes

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation
1. Download all project files to a folder:
   - `index.html`
   - `style.css`
   - `script.js`

2. Open `index.html` in your web browser

That's it! The calculator is ready to use.

## 📖 Usage

### Using the Calculator
1. **Click buttons** or **use your keyboard** to input numbers and operations
2. **Press = or Enter** to calculate the result
3. **Click the history icon** (clock) to view past calculations
4. **Click any history item** to load that result into the calculator

### Example Calculations
- Basic: `7 + 3 = 10`
- Advanced: `9² = 81`
- Square Root: `√16 = 4`
- Percentage: `50% = 0.5`

## 🎯 Project Structure

```
calculator-project/
│
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Calculator logic and functionality
└── README.md           # Project documentation
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Advanced styling with CSS variables, flexbox, grid, animations
- **JavaScript (ES6+)**: Modern JavaScript with classes, arrow functions, template literals

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Key CSS Features
- CSS Custom Properties (Variables)
- CSS Grid Layout
- Flexbox
- Backdrop Filter (glassmorphism)
- CSS Animations and Transitions
- Media Queries for responsiveness

### Key JavaScript Features
- Event Delegation
- LocalStorage API
- DOM Manipulation
- Error Handling
- Keyboard Event Handling

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    /* ... more variables ... */
}
```

### Modifying Button Layout
The button grid uses CSS Grid. Adjust in `style.css`:

```css
.buttons-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-sm);
}
```

## 📝 Code Organization

### HTML Structure
- Semantic HTML5 elements
- Unique IDs for all interactive elements
- Data attributes for easy JavaScript targeting
- Accessible button labels

### CSS Architecture
- CSS Custom Properties for easy theming
- Mobile-first responsive design
- Modular class naming
- Well-commented sections

### JavaScript Organization
- Clear separation of concerns
- Well-documented functions
- Error handling for edge cases
- Comprehensive comments

## 🐛 Error Handling

The calculator handles common errors:
- **Division by zero**: Shows alert and clears calculator
- **Square root of negative**: Shows alert and prevents calculation
- **Reciprocal of zero**: Shows alert and prevents calculation

## 🔮 Future Enhancements

Potential features for future versions:
- Scientific calculator mode
- Memory functions (M+, M-, MR, MC)
- Calculation export (PDF, CSV)
- Theme customization options
- More advanced functions (trigonometry, logarithms)

## 📄 License

This project is free to use for personal and commercial purposes.

## 👨‍💻 Author

Created with ❤️ as a modern, professional calculator application.

## 🙏 Acknowledgments

- Google Fonts for the Poppins typeface
- Modern web design principles and glassmorphism trends
- CSS-Tricks and MDN Web Docs for reference

---

**Enjoy calculating with style! 🧮✨**
