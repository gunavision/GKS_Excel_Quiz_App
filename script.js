// GKS LETS EXCEL Quiz App — question data and client-side quiz flow.
const questions = window.questionBank;
if (!Array.isArray(questions) || questions.length !== 90) {
  throw new Error('The V1.3 question bank did not load correctly.');
}

const $ = (selector) => document.querySelector(selector);
const screens = {home:$('#home-screen'),quiz:$('#quiz-screen'),results:$('#results-screen')};
let mode = null;
let currentIndex = 0;
let selections = [];
let submitted = false;
let attemptQuestions = [];
const allocationRotation = new Map();
const questionStyles = ['knowledge','application','problemSolving'];

// Fisher–Yates shuffle returns a copy so the source bank and option arrays stay untouched.
function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function rotatingTargets(categories, total, key) {
  const base = Math.floor(total / categories.length);
  const surplus = total % categories.length;
  const targets = Object.fromEntries(categories.map(category => [category, base]));
  if (surplus === 0) return targets;
  const offset = allocationRotation.has(key)
    ? allocationRotation.get(key)
    : Math.floor(Math.random() * categories.length);
  for (let index = 0; index < surplus; index++) {
    const category = categories[(offset + index) % categories.length];
    targets[category]++;
  }
  allocationRotation.set(key, (offset + surplus) % categories.length);
  return targets;
}

function rowAllocations(total, capacities, remaining) {
  const allocations = [];
  function build(styleIndex, left, current) {
    if (styleIndex === questionStyles.length - 1) {
      const style = questionStyles[styleIndex];
      if (left >= 0 && left <= capacities[style] && left <= remaining[style]) {
        allocations.push({...current,[style]:left});
      }
      return;
    }
    const style = questionStyles[styleIndex];
    const maximum = Math.min(left, capacities[style], remaining[style]);
    const choices = shuffled(Array.from({length:maximum+1},(_,value)=>value));
    choices.forEach(value => build(styleIndex+1,left-value,{...current,[style]:value}));
  }
  build(0,total,{});
  return shuffled(allocations);
}

function createTopicStyleAllocation(topics, topicTargets, styleTargets, inventory) {
  const topicOrder = shuffled(topics);
  const remainingStyles = {...styleTargets};
  const allocation = {};

  function placeTopic(index) {
    if (index === topicOrder.length) {
      return questionStyles.every(style => remainingStyles[style] === 0);
    }
    const topic = topicOrder[index];
    const capacities = Object.fromEntries(questionStyles.map(style => [style,inventory[topic][style]]));
    const options = rowAllocations(topicTargets[topic],capacities,remainingStyles);
    for (const option of options) {
      allocation[topic] = option;
      questionStyles.forEach(style => { remainingStyles[style] -= option[style]; });
      if (placeTopic(index+1)) return true;
      questionStyles.forEach(style => { remainingStyles[style] += option[style]; });
    }
    delete allocation[topic];
    return false;
  }

  return placeTopic(0) ? allocation : null;
}

function createAttempt(level, questionCount) {
  const levelQuestions = questions.filter(question => question.level === level);
  const topics = [...new Set(levelQuestions.map(question => question.topic))];
  if (!levelQuestions.length || ![10,20,30].includes(questionCount) || levelQuestions.length < questionCount) {
    throw new Error('The selected level does not support this quiz length.');
  }
  const topicTargets = rotatingTargets(topics,questionCount,`${level}:${questionCount}:topics`);
  const styleTargets = rotatingTargets(questionStyles,questionCount,`${level}:${questionCount}:styles`);
  const inventory = Object.fromEntries(topics.map(topic => [topic,Object.fromEntries(
    questionStyles.map(style => [style,levelQuestions.filter(question => question.topic === topic && question.style === style).length])
  )]));
  const allocation = createTopicStyleAllocation(topics,topicTargets,styleTargets,inventory);
  if (!allocation) throw new Error(`No balanced ${questionCount}-question allocation is available for ${level}.`);

  const selectedQuestions = [];
  topics.forEach(topic => questionStyles.forEach(style => {
    const count = allocation[topic][style];
    const candidates = shuffled(levelQuestions.filter(question => question.topic === topic && question.style === style));
    selectedQuestions.push(...candidates.slice(0,count));
  }));

  return shuffled(selectedQuestions).map((question) => {
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
  const counter = $('#counter-footer');
  if (counter) counter.hidden = name !== 'home';
  window.scrollTo({top:0,behavior:'smooth'});
}

function startQuiz(nextMode) {
  const level = $('#level-select').value;
  const questionCount = Number($('#question-count').value);
  if (!level || !questionCount) return;
  mode = nextMode;
  attemptQuestions = createAttempt(level,questionCount);
  currentIndex = 0;
  selections = Array(attemptQuestions.length).fill(null);
  submitted = false;
  $('#mode-label').textContent = mode === 'practice' ? 'PRACTICE MODE' : 'ASSESSMENT MODE';
  $('#quiz-title').textContent = `${level[0].toUpperCase()}${level.slice(1)} Excel Skills`;
  showScreen('quiz');
  renderQuestion();
}

function updateQuestionCounts() {
  const level = $('#level-select').value;
  const countSelect = $('#question-count');
  const supportedCounts = [10,20,30].filter(count => questions.filter(question => question.level === level).length >= count);
  countSelect.replaceChildren(new Option(level ? 'Choose question count' : 'Select a level first',''));
  supportedCounts.forEach(count => countSelect.add(new Option(`${count} Questions`,String(count))));
  countSelect.disabled = !level || supportedCounts.length === 0;
  updateStartButtons();
}

function updateStartButtons() {
  const ready = Boolean($('#level-select').value && $('#question-count').value);
  document.querySelectorAll('[data-start]').forEach(button => { button.disabled = !ready; });
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

function calculateTopicResults() {
  const selectedLevel = $('#level-select').value;
  const stats = new Map();
  questions.filter(question => question.level === selectedLevel).forEach(question => {
    if (!stats.has(question.topic)) {
      stats.set(question.topic,{topic:question.topic,attempted:0,correct:0,incorrect:0,accuracy:null});
    }
  });

  attemptQuestions.forEach((question,index) => {
    let topic = stats.get(question.topic);
    if (!topic) {
      topic = {topic:question.topic,attempted:0,correct:0,incorrect:0,accuracy:null};
      stats.set(question.topic,topic);
    }
    const answer = selections[index];
    if (answer === null) return;
    topic.attempted++;
    if (answer === question.answer) topic.correct++;
    else topic.incorrect++;
  });

  return [...stats.values()].map(topic => ({
    ...topic,
    accuracy:topic.attempted ? Math.round(topic.correct/topic.attempted*100) : null
  }));
}

function appendTopicInsight(container, topics, emptyMessage) {
  container.replaceChildren();
  if (!topics.length) {
    const message = document.createElement('p');
    message.className = 'topic-insight-empty';
    message.textContent = emptyMessage;
    container.append(message);
    return;
  }
  const list = document.createElement('ul');
  topics.forEach(topic => {
    const item = document.createElement('li');
    item.textContent = `${topic.topic} — ${topic.accuracy}% (${topic.correct}/${topic.attempted} correct)`;
    list.append(item);
  });
  container.append(list);
}

function renderTopicResults(topicResults, overallResult) {
  const resultsContainer = $('#topic-results');
  resultsContainer.replaceChildren();
  topicResults.forEach(topic => {
    const card = document.createElement('article');
    card.className = 'topic-result-card';
    const heading = document.createElement('div');
    heading.className = 'topic-result-heading';
    const title = document.createElement('h3');
    title.textContent = topic.topic;
    const accuracy = document.createElement('strong');
    accuracy.className = `topic-accuracy${topic.accuracy === null ? ' not-attempted' : ''}`;
    accuracy.textContent = topic.accuracy === null ? 'Not attempted' : `${topic.accuracy}%`;
    heading.append(title,accuracy);

    const metrics = document.createElement('dl');
    metrics.className = 'topic-metrics';
    [['Attempted',topic.attempted],['Correct',topic.correct],['Incorrect',topic.incorrect]].forEach(([label,value]) => {
      const metric = document.createElement('div');
      const term = document.createElement('dt'); term.textContent = label;
      const detail = document.createElement('dd'); detail.textContent = value;
      metric.append(term,detail); metrics.append(metric);
    });

    card.append(heading,metrics);
    if (topic.attempted > 0 && topic.attempted < 3) {
      const note = document.createElement('p');
      note.className = 'topic-result-note';
      note.textContent = 'Limited questions attempted';
      card.append(note);
    }
    resultsContainer.append(card);
  });

  const eligible = topicResults.filter(topic => topic.attempted >= 3);
  appendTopicInsight($('#topic-strengths'),eligible.filter(topic => topic.accuracy >= 80),eligible.length ? 'No topic reached 80% accuracy in this attempt.' : 'No topics met the minimum sample of 3 answered questions.');
  appendTopicInsight($('#topics-to-practise'),eligible.filter(topic => topic.accuracy < 60),eligible.length ? 'No topic scored below 60% in this attempt.' : 'No topics met the minimum sample of 3 answered questions.');
  const smallSamples = topicResults.filter(topic => topic.attempted > 0 && topic.attempted < 3).length;
  $('#topic-sample-note').textContent = `Stronger topics are at least 80% accurate; topics to practise are below 60%. Both require at least 3 answered questions. ${smallSamples ? `${smallSamples} topic(s) have a limited sample and are not classified. ` : ''}Unattempted topics are not classified. ` + `Topic totals reconcile to ${overallResult.correct} correct, ${overallResult.incorrect} incorrect and ${overallResult.unanswered} unanswered overall.`;
}

function showResults() {
  submitted = true;
  const result = calculateResults();
  const topicResults = calculateTopicResults();
  renderTopicResults(topicResults,result);
  $('#score-number').textContent = result.correct;
  $('#score-total').textContent = result.total;
  $('#score-percent').textContent = `${result.percentage}%`;
  $('#correct-count').textContent = result.correct;
  $('#incorrect-count').textContent = result.incorrect;
  $('#unanswered-count').textContent = result.unanswered;
  const levelName = $('#level-select').value;
  $('#results-level-badge').textContent = levelName.toUpperCase();
  $('#results-mode-badge').textContent = $('#mode-label').textContent;
  $('#performance-message').textContent = result.percentage === 100 ? `Outstanding work. You have mastered this ${levelName} set.` : result.percentage >= 80 ? `Great work. You have a strong grasp of these ${levelName} Excel skills.` : result.percentage >= 50 ? 'Good progress. Review the explanations to strengthen your skills.' : 'Keep practising. Every question is a chance to learn something useful.';
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

$('#level-select').addEventListener('change',updateQuestionCounts);
$('#question-count').addEventListener('change',updateStartButtons);
document.querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',()=>startQuiz(button.dataset.start)));
document.querySelectorAll('[data-home]').forEach(button=>button.addEventListener('click',()=>showScreen('home')));
$('#next-button').addEventListener('click',()=>{if(mode==='practice'&&selections[currentIndex]===null)return;if(currentIndex<attemptQuestions.length-1){currentIndex++;renderQuestion();}else if(mode==='practice'){showResults();}});
$('#previous-button').addEventListener('click',()=>{if(currentIndex>0){currentIndex--;renderQuestion();}});
$('#submit-button').addEventListener('click',()=>{if(mode==='assessment'&&!submitted)showResults();});
$('#retake-button').addEventListener('click',()=>startQuiz(mode));
