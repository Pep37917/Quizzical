import React from 'react'
import './App.css'
import Start from "./Start"
import Quiz from "./Quiz"

function App() {

  const [questionsData, setQuestionsData] = React.useState([])
  const [startQuiz, setStartQuiz] = React.useState(false)

  // fetching API
  React.useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => setQuestionsData(data))
  }, []) 


  return (
    <>
      {
        !startQuiz
        ?
        <Start 
          setStartQuiz={setStartQuiz}
        /> 
        :
        <Quiz data={questionsData}/>
      }
    </>
  )
}

export default App
