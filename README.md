# GKS LETS EXCEL Quiz App - Version 1.3

A responsive, client-side quiz for building practical Microsoft Excel skills. The app uses HTML, CSS, and vanilla JavaScript; it requires no account or application server.

## Features

- Three difficulty levels: Beginner, Intermediate, and Advanced.
- A 90-question bank: 30 questions per level.
- Six level-specific topics per level, with five questions in each topic.
- Ten questions per level in each question style: Knowledge, Application, and Problem-solving.
- Practice Mode with immediate answer feedback and explanations.
- Assessment Mode with question navigation, answer changes before submission, and answer review.
- Quiz lengths of 10, 20, or 30 questions.
- Balanced random selection across topics and question styles, with rotating surplus allocations between attempts.
- Randomized question order and answer options, while preserving the correct answer and explanation.
- Overall results, unanswered-question counts, topic-wise scores, strengths, and topics to practise.
- Excel compatibility metadata on each question. Excel 2019+ is used for supported features; questions requiring newer features such as XLOOKUP and dynamic arrays are marked Excel 2021+.
- Keyboard shortcut questions are based on Microsoft Excel for Windows.
- GNRCounter displays total page views on the landing page. The counter is loaded separately from the quiz logic.

## Topics

**Beginner:** Keyboard shortcuts, Basic formulas, Basic functions, Formatting, Data management, and Cell references.

**Intermediate:** Logical functions, Conditional calculations, Lookup functions, Text and date functions, Data tools, and Reporting and analysis.

**Advanced:** Advanced logical formulas, Advanced lookup, Dynamic arrays, Advanced calculations, Power Query, and Advanced reporting.

## Balanced question selection

The app balances both topic and style totals for each quiz. A 10-question attempt uses topic allocations of 2, 2, 2, 2, 1, and 1, and style allocations of 4, 3, and 3. A 20-question attempt uses topic allocations of 4, 4, 3, 3, 3, and 3, and style allocations of 7, 7, and 6. A 30-question attempt includes five questions per topic and ten per style. Surplus allocations rotate between attempts, and questions are randomized within the resulting allocations.

## Excel compatibility

The quiz is designed for Excel 2019 onwards, including Excel 2021, Excel 2024, and Microsoft 365. Question metadata records the minimum Excel version and platform where applicable. Excel 2019+ and Excel 2021+ labels distinguish questions requiring newer functions or features. Keyboard shortcut questions specifically target Excel for Windows.

## Run locally

1. Download or clone the project folder.
2. Keep `index.html`, `style.css`, `script.js`, and `question-bank.js` together in the same folder.
3. Open `index.html` in a modern browser, or serve the folder with a local static server. For example, with Python installed, run `py -m http.server 8000` in the project folder and open `http://localhost:8000`.
4. The quiz itself runs in the browser. GNRCounter requires an internet connection; if it is unavailable, the external counter may not appear.

## Deploy with GitHub Pages

1. Push the project files to a GitHub repository.
2. In the repository settings, open **Pages** and select the branch and folder containing `index.html`.
3. Save the settings and use the published Pages URL after deployment completes.

## Deploy with Netlify

1. Import the GitHub repository into Netlify, or upload the project folder using Netlify's manual deploy option.
2. Set the publish directory to the folder containing `index.html` (the repository root for this project).
3. Deploy the site. No build command is required for this static HTML, CSS, and JavaScript app.

## Project files

- `index.html` - landing, quiz, and results screens.
- `style.css` - responsive layout and visual styling.
- `script.js` - quiz selection, modes, scoring, and results behavior.
- `question-bank.js` - question data and compatibility metadata.
- `README.md` - project and deployment instructions.

Quiz scores are calculated in the browser and are not saved between page loads.
