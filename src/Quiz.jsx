import React from 'react';
import { decode } from 'html-entities';
import './Quiz.css';

export default function Quiz(props) {

  // states
  const [userResponses, setUserResponses] = React.useState([])
  const [quizSubmitted, setQuizSubmitted] = React.useState(false)
  const [selectedAnswers, setSelectedAnswers] = React.useState([])
  const [shuffledAnswers, setShuffledAnswers] = React.useState([])
  const [score, setScore] = React.useState(0)
  // variales
  const dataArray = props.data.results

  // array variables
  let questionElements = ''

  // getting array for questionElements
  React.useEffect(() => {
    if (dataArray) {
      const newAnswersArray = dataArray.map((data) => {
        const mixedAns = [...data.incorrect_answers, data.correct_answer];
        return shuffle(mixedAns);
      });
      setShuffledAnswers(newAnswersArray);
    }
  }, [dataArray]);
  
  // get score
  React.useEffect(() => {
    if (quizSubmitted) {
      calculateScore()
    }
  }, [quizSubmitted, userResponses, dataArray]);

  // shuffling an array
  function shuffle(array) {
    const shuffledArr = [...array];
  
    for (let i = array.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
  
      if (r !== i) {
        [shuffledArr[i], shuffledArr[r]] = [shuffledArr[r], shuffledArr[i]];
      }
    }
  
    return shuffledArr;
  }

  // handle selection
  function handleAnswerSelection(questionIndex, selectedAnswer) {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedAnswer;
    setSelectedAnswers(newSelectedAnswers);
  }
  

  // getting answers from form
  function getAns(event) {
    event.preventDefault()
  
    const form = event.target
    const formData = new FormData(form)
    const responses = {}
  
    for (const [name, value] of formData.entries()) {
      responses[name] = value
    }

    const responseValues = Object.values(responses)
    setUserResponses(responseValues)
    setQuizSubmitted(true)
    
    setSelectedAnswers([])
  }


  // Adding class for correction
  function getAnswerClassName(questionIndex, ansIndex) {
    if (quizSubmitted) {
      // User selected answer
      const selectedAnswer = userResponses[questionIndex]
      const correctAnswer = dataArray[questionIndex].correct_answer
      const isCorrect = selectedAnswer === correctAnswer
      const currentAnswer = shuffledAnswers[questionIndex][ansIndex]
      
      // Check if the selected answer matches the current answer option
      if (selectedAnswer === currentAnswer) {
        if (isCorrect) {
          return 'correct'
        } else {
          return 'incorrect'
        }
      } else if (currentAnswer === correctAnswer) {
        return "correct"
      }
      
    }
    return ""
  }

  // calculate score
  function calculateScore() {
      let newScore = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const selectedAnswer = userResponses[i];
        const correctAnswer = dataArray[i].correct_answer;
        if (selectedAnswer === correctAnswer) {
          newScore++;
        }
      }
      setScore(newScore);
  }

  if (dataArray) {
    questionElements = dataArray.map((data, index) => {
        return (
          <div key={index} className={`question question-${index}`}>
            <h2>{decode(data.question)}</h2>
            <div className="radio-btns">
                { // rendering answer choices
                shuffledAnswers[index] && shuffledAnswers[index].map((ans, ansIndex) => {
                  return (
                  <div key={ansIndex}>
                    <input 
                      className="choice" 
                      type="radio" 
                      name={`choice_${index}`} 
                      value={ans} 
                      id={`q${index}_a${ansIndex}`} 
                      key={ansIndex}
                      checked={selectedAnswers[index] === ans}
                      onChange={() => handleAnswerSelection(index, ans)}
                    />
                    <label 
                      className={`label-box ${getAnswerClassName(index, ansIndex)}`}
                      htmlFor={`q${index}_a${ansIndex}`}
                    >
                      {ans}
                    </label>
                  </div>
                )})}
            </div>
            <svg className={`vec vec-${index}`} xmlns="http://www.w3.org/2000/svg" width="406" height="12" viewBox="0 0 406 12" fill="none">
              <path d="M400.177 0H6.6172C1.54783 0 -1.01736 6.1052 2.53069 9.72595C3.91625 11.1399 5.93429 11.7371 7.86619 11.305L21.9961 8.14418C26.8291 7.06307 31.8481 7.12788 36.6516 8.33342L40.8312 9.38239C47.7055 11.1077 54.8684 11.3488 61.8432 10.0896L69.6744 8.67593C77.6235 7.24092 85.7838 7.47062 93.6396 9.35051C100.952 11.1004 108.533 11.4216 115.968 10.2967L128.934 8.33459C136.945 7.12234 145.113 7.4272 153.011 9.23328C161.004 11.0611 169.272 11.3511 177.374 10.088L188.305 8.38385C196.291 7.13877 204.438 7.38683 212.334 9.11542C221.026 11.0184 230.015 11.1252 238.75 9.42939L240.423 9.10458C249.29 7.38292 258.4 7.30924 267.294 8.88722L269.872 9.34467C279.772 11.1009 289.904 11.0857 299.798 9.29954L300.614 9.15238C310.326 7.39909 320.278 7.44733 329.972 9.2947C339.362 11.0839 348.995 11.186 358.421 9.59602L369.033 7.80584C374.145 6.94349 379.376 7.08203 384.435 8.21377L398.912 11.452C400.475 11.8016 402.113 11.4889 403.437 10.5879C408.155 7.37813 405.883 0 400.177 0Z" fill="#FCF7CA"/>
            </svg>
          </div>
        );
    });
  }

  return (
 
      <div className="quiz-container">
        <svg className="b-vec-1" xmlns="http://www.w3.org/2000/svg" width="550" height="31" viewBox="0 0 550 31" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M302.861 -90.6193C396.663 -89.1787 501.35 -91.6721 568.848 -74.7044C643.557 -55.924 664.747 -28.7477 635.717 -6.94548C608.179 13.7365 524.132 26.8513 429.274 30.1187C349.419 32.8692 277.572 18.0841 201.74 8.00272C120.121 -2.84801 11.0919 -8.81883 -15.71 -29.0389C-43.6589 -50.1244 15.8366 -69.3496 82.2039 -82.1785C139.768 -93.3058 222.147 -91.859 302.861 -90.6193Z" fill="#FFFAD1"/>
        </svg>
        <form className="quiz-form" onSubmit={getAns}>
          {questionElements}
          <div className="lower">
            {!quizSubmitted 
              ?
              <button className="submit-btn" type="submit">submit</button>
              :
              <button className="refresh-btn" onClick={() => window.location.reload()}>Retry</button>
            }
            {quizSubmitted && <p className="quiz-score">Score: {score} / {dataArray.length}</p>}
          </div>
        </form>
        <svg className="b-vec-2" xmlns="http://www.w3.org/2000/svg" width="550" height="43" viewBox="0 0 550 43" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M250.651 2.96445C331.581 1.07254 421.806 -5.87426 480.414 11.5469C545.284 30.8293 564.196 62.0589 539.67 88.8747C516.405 114.313 444.23 132.992 362.499 140.475C293.696 146.775 231.388 132.093 165.753 123.11C95.1097 113.441 0.941935 110.575 -22.646 87.7612C-47.2434 63.9714 3.61604 39.0277 60.5515 21.3621C109.935 6.03978 181.014 4.59238 250.651 2.96445Z" fill="#DEEBF8"/>
        </svg>
      </div>
   
  )
}

