# The Academic Lottery

## Project Overview
The Academic Lottery is a web-based lottery simulation platform that allows users to participate in virtual lottery games for entertainment purposes. The project aims to raise awareness about responsible gaming while providing statistical information and a fun interactive experience. This project was built using HTML, CSS, and JavaScript.

## Features
1. **Dynamic Lottery Tables:**
   - Users can add up to 5 lottery tables.
   - Each table contains fields for 6 numbers (1-37) and 1 "strong" number (1-7).
   - Validation ensures numbers are within range and non-repeating within each table.

2. **Interactive Navigation:**
   - "About" section to learn about the purpose of the lottery.
   - Statistical information on winning probabilities.
   - "Winners in History" section displays a motivational message.
   - Terms of Use dialog outlining responsible gaming guidelines.

3. **Lottery Mechanics:**
   - Users can start the lottery by submitting their tables.
   - Generates random lottery results, including 6 numbers and a "strong" number.
   - Calculates winnings based on matches and updates the user’s balance.

4. **Balance Management:**
   - Users begin with a balance of 1000.
   - Deduction of 300 per table used.
   - Winnings are credited based on the prize structure.

5. **Dialogs and Warnings:**
   - Dialogs notify users of insufficient funds or invalid inputs.
   - Encourages responsible gaming with warnings about gambling addiction.

6. **Responsive Design:**
   - Optimized for mobile and tablet devices.

## Project Structure
### 1. `index.html`
- Serves as the main structure for the platform.
- Includes navigation, lottery tables, and dialogs.

### 2. `style.css`
- Styles the platform with:
  - Gradient backgrounds for navigation and tables.
  - Responsive layouts for mobile compatibility.
  - Hover effects for buttons and inputs.

### 3. `app.js`
- Implements dynamic functionality, including:
  - Adding, removing, and resetting lottery tables.
  - Validating user inputs.
  - Generating lottery results and calculating winnings.
  - Handling dialogs and interactive buttons.

## How to Use
1. Open the `index.html` file in a web browser.
2. Use the navigation menu to explore sections like About, Statistics, and Terms of Use.
3. Add lottery tables and input your numbers.
4. Click "Start Lottery" to participate and view results.
5. Manage your balance wisely to keep playing.
6. Click "Done Playing" to disable inputs and conclude the session.

## Technologies Used
- **HTML5**: Markup structure.
- **CSS3**: Styling and responsiveness.
- **JavaScript**: Interactivity and logic implementation.

## Warnings
- The platform is intended for users aged 18 and above.
- All outcomes are based on random chance.
- Encourages responsible gaming with appropriate warnings.

## Future Enhancements
- Store user data persistently using local storage or a backend service.
- Add more detailed statistical analysis.
- Enable a leaderboard for tracking top winners.

## Credits
This project was developed to provide an engaging lottery simulation experience with an emphasis on responsible gaming.
