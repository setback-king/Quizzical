import React from 'react'
import Main from "./components/Main"
import Quiz from "./components/Quiz"




export default function App() {
    
    const [quiz, setQuiz] = React.useState(false) 
    
    
function generateQuiz() {
    setQuiz(prevValue => prevValue = !prevValue)
}
    
    return (
        <div className="container">
            {quiz && <Main generateQuiz={generateQuiz} /> }
            {!quiz && <Quiz />}
        
        </div>
    )
}