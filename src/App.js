import React from 'react'
import Main from "./components/Main"
import Quiz from "./components/Quiz"




export default function App() {
    
    const [quiz, setQuiz] = React.useState(false) 
    
    const [checked, setChecked] = React.useState(false)
    
    
function generateQuiz() {
    setQuiz(prevValue => prevValue = !prevValue)
}

function checkAnswers() {
    setChecked(prevValue => prevValue = !prevValue)
}

function newGame() {
    setChecked(prevValue => prevValue = !prevValue)
}
    
    return (
        <div className="container">
            {quiz && <Main generateQuiz={generateQuiz} /> }
            {!quiz && <Quiz checkAnswers={checkAnswers} checked={checked} newGame={newGame}/>}
        
        </div>
    )
}