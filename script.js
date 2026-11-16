// GKS LETS EXCEL Quiz App — question data and client-side quiz flow.
const questions = [
  {topic:'Keyboard shortcuts',question:'Which keyboard shortcut copies the selected cell or range in Excel?',options:['Ctrl + X','Ctrl + C','Ctrl + V','Ctrl + Z'],answer:1,explanation:'Ctrl+C copies the selected cell or range to the Clipboard. Use Ctrl+V to paste it.'},
  {topic:'Keyboard shortcuts',question:'You copied a cell and want to place a copy elsewhere. Which shortcut pastes it?',options:['Ctrl + P','Ctrl + C','Ctrl + V','Ctrl + T'],answer:2,explanation:'Ctrl+V pastes the most recently copied or cut content from the Clipboard.'},
  {topic:'Keyboard shortcuts',question:'You accidentally deleted some cell contents. Which shortcut undoes the last action?',options:['Ctrl + Z','Ctrl + C','Ctrl + 1','Ctrl + V'],answer:0,explanation:'Ctrl+Z reverses the most recent action in Excel, such as deleting cell contents.'},
  {topic:'Keyboard shortcuts',question:'Which shortcut opens the Format Cells dialog box for the selected cells?',options:['Ctrl + T','Ctrl + 1','Ctrl + F','Ctrl + Z'],answer:1,explanation:'Ctrl+1 opens the Format Cells dialog, where you can set number formats, alignment, borders, and more.'},
  {topic:'Keyboard shortcuts',question:'Which shortcut creates an Excel table from a selected data range?',options:['Ctrl + T','Ctrl + 1','Ctrl + C','Ctrl + A'],answer:0,explanation:'Ctrl+T opens the Create Table dialog for the selected data range. Excel may ask whether the data has headers.'},
  {topic:'Basic functions',question:'Which formula adds the values in cells A1 through A5?',options:['=COUNT(A1:A5)','=AVERAGE(A1:A5)','=SUM(A1:A5)','=MAX(A1:A5)'],answer:2,explanation:'SUM adds the numbers in the specified cells. The colon in A1:A5 means the whole range from A1 through A5.'},
  {topic:'Basic functions',question:'Which function calculates the arithmetic mean of the numbers in B2 through B8?',options:['=MIN(B2:B8)','=AVERAGE(B2:B8)','=COUNT(B2:B8)','=SUM(B2:B8)'],answer:1,explanation:'AVERAGE adds the numeric values in the range and divides by the count of those numeric values.'},
  {topic:'Basic functions',question:'Cells C1:C5 contain 12, 8, the text "N/A", 5, and a blank. What does =COUNT(C1:C5) return?',options:['2','3','4','5'],answer:1,explanation:'COUNT counts cells containing numbers. It counts 12, 8, and 5; text and blank cells are not counted.'},
  {topic:'Basic functions',question:'Which function returns the largest number in D1:D10?',options:['=MIN(D1:D10)','=COUNT(D1:D10)','=MAX(D1:D10)','=SUM(D1:D10)'],answer:2,explanation:'MAX returns the largest numeric value in the specified range.'},
  {topic:'Basic functions',question:'Which function returns the smallest number in E1:E10?',options:['=MAX(E1:E10)','=AVERAGE(E1:E10)','=COUNT(E1:E10)','=MIN(E1:E10)'],answer:3,explanation:'MIN returns the smallest numeric value in the specified range.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut cuts the selected cell or range so you can move it elsewhere?',options:['Ctrl + C','Ctrl + X','Ctrl + V','Ctrl + Z'],answer:1,explanation:'Ctrl+X cuts the selection and places it on the Clipboard so it can be pasted elsewhere.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut saves the current workbook?',options:['Ctrl + P','Ctrl + S','Ctrl + O','Ctrl + N'],answer:1,explanation:'Ctrl+S saves changes to the current workbook. For a new workbook, Excel may ask you to choose a name and location.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut opens Find so you can search worksheet content?',options:['Ctrl + F','Ctrl + H','Ctrl + G','Ctrl + P'],answer:0,explanation:'Ctrl+F opens the Find dialog, where you can search for text or values in the workbook.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut opens Replace to find content and replace it with something else?',options:['Ctrl + F','Ctrl + R','Ctrl + H','Ctrl + G'],answer:2,explanation:'Ctrl+H opens Find and Replace with the Replace controls available.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut opens the print screen for the current workbook?',options:['Ctrl + S','Ctrl + O','Ctrl + N','Ctrl + P'],answer:3,explanation:'Ctrl+P opens Excel print settings and print preview.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut creates a new blank workbook?',options:['Ctrl + N','Ctrl + O','Ctrl + W','Ctrl + S'],answer:0,explanation:'Ctrl+N creates a new workbook.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut opens the dialog for opening an existing workbook?',options:['Ctrl + N','Ctrl + O','Ctrl + P','Ctrl + W'],answer:1,explanation:'Ctrl+O opens the Open page or dialog so you can choose an existing workbook.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut applies bold formatting to the selected cells or text?',options:['Ctrl + I','Ctrl + U','Ctrl + B','Ctrl + 1'],answer:2,explanation:'Ctrl+B toggles bold formatting for the selected cells or text.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut applies italic formatting to the selected cells or text?',options:['Ctrl + U','Ctrl + B','Ctrl + 1','Ctrl + I'],answer:3,explanation:'Ctrl+I toggles italic formatting for the selected cells or text.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut applies underline formatting to the selected cells or text?',options:['Ctrl + U','Ctrl + B','Ctrl + I','Ctrl + 1'],answer:0,explanation:'Ctrl+U toggles underline formatting for the selected cells or text.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut moves the active cell to A1 on the worksheet?',options:['Ctrl + End','Ctrl + Home','Home','Ctrl + Arrow'],answer:1,explanation:'Ctrl+Home moves to the beginning of the worksheet, cell A1.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut moves to the last cell in the worksheet that is in use?',options:['Ctrl + Home','End','Ctrl + End','Ctrl + Arrow'],answer:2,explanation:'Ctrl+End moves to the last cell of the worksheet’s used range, at the intersection of the last used row and column.'}
  ,{topic:'Keyboard shortcuts',question:'What does Ctrl+Right Arrow do from a cell inside a block of data?',options:['Moves one cell right','Moves to the next worksheet','Moves to the right edge of the current data region','Selects the entire row'],answer:2,explanation:'Ctrl+Arrow moves to the edge of the current data region in the arrow’s direction; Ctrl+Right Arrow moves to its right edge.'}
  ,{topic:'Keyboard shortcuts',question:'Which key lets you edit the active cell directly?',options:['F1','F2','F4','F9'],answer:1,explanation:'F2 edits the active cell and places the insertion point in its contents. If cell editing is turned off, it moves focus to the formula bar.'}
  ,{topic:'Keyboard shortcuts',question:'Which key removes the contents of selected cells without deleting the cells themselves?',options:['Backspace','Delete','Esc','Enter'],answer:1,explanation:'Delete clears the contents of selected cells while leaving the cells in the worksheet.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut selects the entire column containing the active cell?',options:['Shift + Space','Ctrl + Space','Ctrl + A','Alt + Space'],answer:1,explanation:'Ctrl+Space selects the entire column that contains the active cell.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut selects the entire row containing the active cell?',options:['Shift + Space','Ctrl + Space','Ctrl + Shift + Space','Alt + Space'],answer:0,explanation:'Shift+Space selects the entire row that contains the active cell.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut hides the selected worksheet rows?',options:['Ctrl + 0','Ctrl + 9','Ctrl + Shift + 9','Ctrl + H'],answer:1,explanation:'Ctrl+9 hides the selected rows. The row data remains in the worksheet and can be unhidden.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut toggles AutoFilter on or off for a selected data range?',options:['Ctrl + Shift + L','Ctrl + Shift + F','Alt + A','Ctrl + T'],answer:0,explanation:'Ctrl+Shift+L applies or removes filter drop-downs for a selected data range.'}
  ,{topic:'Keyboard shortcuts',question:'Which shortcut inserts an AutoSum formula for nearby numbers?',options:['Ctrl + =','Alt + =','Shift + =','Ctrl + Shift + S'],answer:1,explanation:'Alt+= (Alt+Equal Sign) inserts the AutoSum formula, which proposes a nearby range to add.'}
  ,{topic:'Basic functions',question:'Cells A1:A4 contain 12, "East", a blank, and 8. What does =COUNTA(A1:A4) return?',options:['2','3','4','1'],answer:1,explanation:'COUNTA counts nonempty cells, including cells containing text. Here 12, "East", and 8 are nonempty, so the result is 3.'}
  ,{topic:'Basic functions',question:'If A1 contains 72, what does =IF(A1>=60,"Pass","Retry") return?',options:['72','FALSE','Pass','Retry'],answer:2,explanation:'IF tests whether A1 is at least 60. Since 72 meets that condition, the formula returns its value_if_true text, "Pass".'}
  ,{topic:'Basic functions',question:'Column A contains region names and column B contains sales. Which formula adds sales in B2:B5 only where A2:A5 equals "East"?',options:['=SUM(B2:B5,"East")','=SUMIF(A2:A5,"East",B2:B5)','=COUNTIF(A2:A5,"East")','=IF(A2:A5="East",B2:B5)'],answer:1,explanation:'SUMIF uses the syntax SUMIF(range, criteria, [sum_range]). It checks A2:A5 for "East" and adds the corresponding values in B2:B5.'}
  ,{topic:'Basic functions',question:'Which formula counts numbers in C1:C10 that are greater than or equal to 10?',options:['=SUMIF(C1:C10,">=10")','=COUNT(C1:C10,">=10")','=COUNTIF(C1:C10,">=10")','=COUNTA(C1:C10,">=10")'],answer:2,explanation:'COUNTIF counts cells in a range that meet one criterion. Put a comparison criterion such as ">=10" in quotation marks.'}
  ,{topic:'Basic functions',question:'If A1 contains 3.14159, what does =ROUND(A1,2) return?',options:['3.1','3.14','3.142','4'],answer:1,explanation:'ROUND(number, num_digits) rounds to the specified number of decimal places. A num_digits value of 2 keeps two decimal places.'}
  ,{topic:'Basic functions',question:'What does =TODAY() return in Excel?',options:['The current date','The current time only','The workbook creation date','The current date and time'],answer:0,explanation:'TODAY() returns the current date as an Excel date value and has no arguments. It updates when the worksheet recalculates.'}
  ,{topic:'Basic functions',question:'If A1 contains "Spreadsheet", what does =LEFT(A1,5) return?',options:['sheet','Spread','Sprea','ad'],answer:2,explanation:'LEFT(text, num_chars) returns characters from the beginning of text. The first five characters of "Spreadsheet" are "Sprea".'}
  ,{topic:'Basic functions',question:'If A1 contains "Spreadsheet", what does =RIGHT(A1,4) return?',options:['Spre','heet','read','eet'],answer:1,explanation:'RIGHT(text, num_chars) returns characters from the end of text. The last four characters of "Spreadsheet" are "heet".'}
  ,{topic:'Basic functions',question:'What does =LEN("Excel 101") return?',options:['8','9','10','11'],answer:1,explanation:'LEN returns the number of characters in a text string, including spaces. "Excel 101" has nine characters.'}
  ,{topic:'Basic functions',question:'If A1 contains 4, what does =IF(A1<0,"Negative","Zero or positive") return?',options:['Negative','4','TRUE','Zero or positive'],answer:3,explanation:'The condition A1<0 is false when A1 is 4, so IF returns the third argument, value_if_false: "Zero or positive".'}
  ,{topic:'Basic functions',question:'Column A contains order amounts and column B contains fees. Which formula adds fees in B2:B5 for amounts in A2:A5 that are at least 100?',options:['=SUMIF(A2:A5,">=100",B2:B5)','=SUM(B2:B5,">=100")','=COUNTIF(A2:A5,">=100",B2:B5)','=SUMIF(B2:B5,">=100",A2:A5)'],answer:0,explanation:'SUMIF checks the first range A2:A5 against the ">=100" criterion, then adds the corresponding values from the sum range B2:B5.'}
  ,{topic:'Basic functions',question:'Cells A1:A5 contain "Paid", "Pending", "Paid", a blank, and "paid". What does =COUNTIF(A1:A5,"Paid") return?',options:['1','2','3','4'],answer:2,explanation:'COUNTIF counts cells meeting the criterion. Text matching is case-insensitive, so all three cells containing Paid or paid are counted.'}
  ,{topic:'Basic functions',question:'What does =ROUND(14.6,0) return?',options:['14','14.6','15','20'],answer:2,explanation:'ROUND with num_digits equal to 0 rounds to the nearest whole number. Since the decimal part is .6, 14.6 rounds to 15.'}
  ,{topic:'Basic functions',question:'Cells B1:B5 contain 6, "Done", a blank, 0, and a formula returning an empty string (""). What does =COUNTA(B1:B5) return?',options:['2','3','4','5'],answer:2,explanation:'COUNTA counts cells containing any information. It counts 6, "Done", 0, and the formula result ""; only the truly blank cell is excluded.'}
  ,{topic:'Basic functions',question:'Cells C1:C5 contain 5, a blank, 0, a blank, and 9. What does =COUNTBLANK(C1:C5) return?',options:['1','2','3','4'],answer:1,explanation:'COUNTBLANK counts empty cells in the range. There are two truly blank cells; a cell containing 0 is not blank.'}
  ,{topic:'Basic functions',question:'If A1:A3 contain 2, 3, and 4, what does =PRODUCT(A1:A3) return?',options:['9','14','24','234'],answer:2,explanation:'PRODUCT multiplies all the numbers in its arguments: 2 × 3 × 4 = 24.'}
  ,{topic:'Basic functions',question:'What does =MEDIAN(2,4,9) return?',options:['2','4','5','9'],answer:1,explanation:'MEDIAN returns the middle value in an ordered set. In 2, 4, 9, the middle value is 4.'}
  ,{topic:'Basic functions',question:'If A1 is 5 and B1 is 2, what does =AND(A1>0,B1>0) return?',options:['TRUE','FALSE','7','2'],answer:0,explanation:'AND returns TRUE only when all its tests are true. Both A1>0 and B1>0 are true here.'}
  ,{topic:'Basic functions',question:'If A1 is 5 and B1 is -2, what does =OR(A1<0,B1<0) return?',options:['TRUE','FALSE','3','-2'],answer:0,explanation:'OR returns TRUE when at least one test is true. B1<0 is true, so the formula returns TRUE.'}
  ,{topic:'Basic functions',question:'If A1 contains "GKS" and B1 contains "Excel", what does =CONCAT(A1," ",B1) return?',options:['GKSEXCEL','GKS Excel','GKS, Excel','Excel GKS'],answer:1,explanation:'CONCAT joins text values in the order supplied. The formula adds a space between the contents of A1 and B1.'}
];

const $ = (selector) => document.querySelector(selector);
const screens = {home:$('#home-screen'),quiz:$('#quiz-screen'),results:$('#results-screen')};
let mode = null;
let currentIndex = 0;
let selections = [];
let submitted = false;
let attemptQuestions = [];

// Fisher–Yates shuffle returns a copy so the source bank and option arrays stay untouched.
function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function createAttempt(questionCount) {
  return shuffled(questions).slice(0, questionCount).map((question) => {
    const answerOptions = question.options.map((text, index) => ({
      text,
      isCorrect: index === question.answer
    }));
    const options = shuffled(answerOptions);
    return {
      ...question,
      options: options.map((option) => option.text),
      answer: options.findIndex((option) => option.isCorrect)
    };
  });
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => { screen.hidden = key !== name; });
  window.scrollTo({top:0,behavior:'smooth'});
}

function startQuiz(nextMode) {
  mode = nextMode;
  attemptQuestions = createAttempt(Number($('#question-count').value));
  currentIndex = 0;
  selections = Array(attemptQuestions.length).fill(null);
  submitted = false;
  $('#mode-label').textContent = mode === 'practice' ? 'PRACTICE MODE' : 'ASSESSMENT MODE';
  showScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  const item = attemptQuestions[currentIndex];
  const selected = selections[currentIndex];
  const answered = selected !== null;
  $('#question-counter').textContent = `${String(currentIndex+1).padStart(2,'0')} / ${attemptQuestions.length}`;
  $('#progress-label').textContent = `Question ${currentIndex+1} of ${attemptQuestions.length}`;
  $('#progress-percent').textContent = `${Math.round(((currentIndex+1)/attemptQuestions.length)*100)}%`;
  $('#progress-fill').style.width = `${((currentIndex+1)/attemptQuestions.length)*100}%`;
  $('.progress-track').setAttribute('aria-valuemax',String(attemptQuestions.length));
  $('.progress-track').setAttribute('aria-valuenow',String(currentIndex+1));
  $('#topic-tag').textContent = item.topic.toUpperCase();
  $('#question-text').textContent = item.question;
  $('#answered-indicator').hidden = !(mode === 'practice' && answered);
  const answerList = $('#answer-list');
  answerList.replaceChildren();
  item.options.forEach((option,index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-option';
    button.setAttribute('aria-pressed',String(selected === index));
    const letter = document.createElement('span'); letter.className='answer-letter'; letter.textContent=String.fromCharCode(65+index);
    const text = document.createElement('span'); text.className='answer-text'; text.textContent=option;
    const mark = document.createElement('span'); mark.className='answer-mark';
    button.append(letter,text,mark);
    if (selected === index) button.classList.add('selected');
    if (mode === 'practice' && answered) {
      button.disabled = true;
      if (index === item.answer) { button.classList.add('is-correct'); mark.textContent='✓'; }
      if (index === selected && selected !== item.answer) { button.classList.add('is-incorrect'); mark.textContent='×'; }
    } else {
      button.addEventListener('click',() => selectAnswer(index));
    }
    answerList.append(button);
  });
  const feedback = $('#feedback');
  feedback.hidden = !(mode === 'practice' && answered);
  feedback.classList.toggle('incorrect-feedback',answered && selected !== item.answer);
  if (mode === 'practice' && answered) {
    feedback.replaceChildren();
    const title = document.createElement('strong');
    title.textContent = selected === item.answer ? 'That’s correct!' : `Not quite. The correct answer is ${String.fromCharCode(65+item.answer)}.`;
    feedback.append(title,document.createTextNode(item.explanation));
  }
  $('#previous-button').disabled = currentIndex === 0;
  $('#previous-button').hidden = mode === 'practice';
  $('#next-button').hidden = mode === 'assessment' && currentIndex === attemptQuestions.length-1;
  $('#next-button').disabled = mode === 'practice' && !answered;
  $('#next-button').innerHTML = currentIndex === attemptQuestions.length-1 ? 'See results <span aria-hidden="true">→</span>' : 'Next question <span aria-hidden="true">→</span>';
  $('#submit-button').hidden = mode !== 'assessment' || currentIndex !== attemptQuestions.length-1;
  $('#answered-count').textContent = mode === 'assessment' ? `${selections.filter(answer => answer !== null).length} of ${attemptQuestions.length} answered` : '';
}

function selectAnswer(index) {
  if (mode === 'practice' && selections[currentIndex] !== null) return;
  selections[currentIndex] = index;
  renderQuestion();
}

function calculateResults() {
  const correct = selections.reduce((sum,answer,index) => sum + (answer === attemptQuestions[index].answer ? 1 : 0),0);
  const unanswered = selections.filter(answer => answer === null).length;
  const total = attemptQuestions.length;
  return {total,correct,unanswered,incorrect:total-correct-unanswered,percentage:Math.round(correct/total*100)};
}

function showResults() {
  submitted = true;
  const result = calculateResults();
  $('#score-number').textContent = result.correct;
  $('#score-total').textContent = result.total;
  $('#score-percent').textContent = `${result.percentage}%`;
  $('#correct-count').textContent = result.correct;
  $('#incorrect-count').textContent = result.incorrect;
  $('#unanswered-count').textContent = result.unanswered;
  $('#performance-message').textContent = result.percentage === 100 ? 'Outstanding work. You have mastered this beginner set.' : result.percentage >= 80 ? 'Great work. You have a strong grasp of these Excel essentials.' : result.percentage >= 50 ? 'Good progress. Review the explanations to strengthen your skills.' : 'Keep practising. Every question is a chance to learn something useful.';
  $('#review-summary').textContent = `${result.total} questions · ${result.percentage}%`;
  const list = $('#review-list');
  list.replaceChildren();
  attemptQuestions.forEach((item,index) => {
    const answer=selections[index], isCorrect=answer===item.answer, unanswered=answer===null;
    const card=document.createElement('article');card.className='review-item';
    const top=document.createElement('div');top.className='review-top';
    const num=document.createElement('span');num.className='review-number';num.textContent=`QUESTION ${String(index+1).padStart(2,'0')}`;
    const status=document.createElement('span');status.className=`review-status ${unanswered?'unanswered':isCorrect?'correct':'incorrect'}`;status.textContent=unanswered?'UNANSWERED':isCorrect?'CORRECT':'INCORRECT';top.append(num,status);
    const question=document.createElement('p');question.className='review-question';question.textContent=item.question;
    const response=document.createElement('p');response.className='review-answer';
    const yours=document.createElement('strong');yours.textContent='Your answer: ';
    response.append(yours,document.createTextNode(unanswered?'No answer selected':`${String.fromCharCode(65+answer)}. ${item.options[answer]}`));
    const correct=document.createElement('p');correct.className='review-answer';const correctLabel=document.createElement('strong');correctLabel.textContent='Correct answer: ';correct.append(correctLabel,document.createTextNode(`${String.fromCharCode(65+item.answer)}. ${item.options[item.answer]}`));
    const explanation=document.createElement('p');explanation.className='review-explanation';const why=document.createElement('strong');why.textContent='Explanation: ';explanation.append(why,document.createTextNode(item.explanation));
    card.append(top,question,response,correct,explanation);list.append(card);
  });
  showScreen('results');
}

document.querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',()=>startQuiz(button.dataset.start)));
document.querySelectorAll('[data-home]').forEach(button=>button.addEventListener('click',()=>showScreen('home')));
$('#next-button').addEventListener('click',()=>{if(mode==='practice'&&selections[currentIndex]===null)return;if(currentIndex<attemptQuestions.length-1){currentIndex++;renderQuestion();}else if(mode==='practice'){showResults();}});
$('#previous-button').addEventListener('click',()=>{if(currentIndex>0){currentIndex--;renderQuestion();}});
$('#submit-button').addEventListener('click',()=>{if(mode==='assessment'&&!submitted)showResults();});
$('#retake-button').addEventListener('click',()=>startQuiz(mode));
