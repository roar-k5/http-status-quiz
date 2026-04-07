# HTTP Status Code Quiz

A gamified technical assessment for web developers to test their knowledge of HTTP status codes through realistic server scenarios.

## Features

- Time Pressure - 15 seconds per question to simulate real debugging stress
- Leaderboard - Save high scores and compete with other developers
- 20 Scenarios - Real-world HTTP situations from 404s to 503s
- Scoring System - Points based on speed + accuracy + streak multipliers
- Responsive Design - Works on desktop, tablet, and mobile
- Keyboard Support - Press Enter to continue between questions

## Quick Start

1. Clone the repository:
   git clone [https://github.com/roar-k5/http-status-quiz.git]
   cd http-status-quiz

2. Open index.html in your browser:
   open index.html

   Or using a local server:
   npx serve .
   or
   python -m http.server 8000

3. Click "Start Challenge" and test your HTTP knowledge!

## Project Structure

http-status-quiz/
├── index.html          # Main entry point
├── styles.css          # Cyberpunk-themed styling
├── data.js             # 50+ HTTP status code questions
├── game.js             # Core game logic & state management
├── ui.js               # UI rendering & DOM manipulation
├── leaderboard.js      # LocalStorage leaderboard system

## How to Play

1. Read the Scenario - Each question presents a server situation
2. Select Status Code - Choose the correct HTTP response code
3. Score Points - Fast answers + streaks = higher scores
4. Save Score - Top 10 scores qualify for the leaderboard

### Scoring Formula

Base Points: 100-1000 (based on remaining time)
Streak Bonus: +10% per consecutive correct answer
Max Streak Multiplier: 2x

## Tech Stack

- Frontend: Vanilla HTML5, CSS3, JavaScript (ES6+)
- Storage: LocalStorage for leaderboard persistence
- Fonts: JetBrains Mono (code), Inter (UI)
- No Dependencies: 100% vanilla, zero build step required

## Customization

### Adding New Questions

Edit data.js and add to the QUESTIONS array:

{
    scenario: "User requests a page that requires authentication",
    correct: { code: "401", name: "Unauthorized" },
    explanation: "401 indicates authentication is required and has failed or not been provided.",
    difficulty: "medium",
    category: "client-error"
}

### Modifying Time Limit

Change TIME_LIMIT in game.js:
this.TIME_LIMIT = 20; // seconds per question

## Browser Support

- Chrome 90+ 
- Firefox 88+ 
- Safari 14+ 
- Edge 90+ 

## License

Distributed under the MIT License.

---

Built for developers who debug in production
