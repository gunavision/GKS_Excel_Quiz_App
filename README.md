# GKS LETS EXCEL Quiz App — Version 1.2

A responsive, client-side Excel Beginners quiz built with HTML5, CSS3, and vanilla JavaScript. No backend, account, or installation is required.

## Run locally

1. Open the project folder.
2. Open `index.html` in a current browser (double-click it, or use VS Code's Live Server if installed).

The app works offline after its files are available. The optional Google Fonts import falls back to system fonts when there is no network connection.

## Quiz contents

The 50-question bank contains 25 Excel for Windows keyboard shortcut questions and 25 basic function questions. At the start of each attempt, choose 10, 20, 30, or 50 questions. The app randomly selects questions without repeats and shuffles each question's answer options while preserving its correct answer.

## Modes

- **Practice Mode:** one question at a time, immediate feedback and explanation, locked answer after selection, and a final score.
- **Assessment Mode:** move between questions, revise selections, submit once, and review correct answers, explanations, and unanswered questions.
- **Retake:** starts a fresh random selection and shuffle using the selected question count.

Scores are calculated in the browser and are not saved after leaving or refreshing the page.
