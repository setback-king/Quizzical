import Question from "./Question";
import {nanoid} from "nanoid";
import { decode } from 'html-entities';
import { useEffect, useState } from 'react'
import arrayShuffle from "array-shuffle";

export default function Quiz(props) {
    
    
    const [data, setData] = useState([]);
    
    const [choice, setChoice] = useState([]);
    
    
  
    
  
    
  useEffect(() => {  
         function fetchData(){
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setData(data.results))
        }
        
        fetchData()
        
      
  }, [])

    useEffect(()=> {
        function storeQuestions(){
            setChoice(prevValue => {
                const questionArray = []
                data.map(item => {
                   let obj = {
                        question: item.question,
                        correct: item.correct_answer,
                        incorrect: item.incorrect_answers,
                        rightChoice: false,
                        answers: arrayShuffle([item.correct_answer, item.incorrect_answers[0], item.incorrect_answers[1], item.incorrect_answers[2]]),
                        id: nanoid()
                    }
                    questionArray.push(obj)
                })

               let thisWorks = arrayShuffle(questionArray)
                return thisWorks
            })  
           
        }
            storeQuestions()

    }, [data])
    
  
 





    
    let questionElements = choice.map((item, index) => {
      
    return  <Question question={decode(item.question)} choiceOne={decode(item.answers[0])} key={index} />
        
    })
  

    


    return (
        <div className="home">
            {questionElements}
            
            
            {props.checked ?  <div className="newGame"> 
            <span className="score">You scored this many right </span> 
            <button className="btn--newGame" onClick={props.newGame}>Play Again</button>
            </div>
            : 
            <button className="btn--check" onClick={props.checkAnswers}>Check Answers</button> 
            }
            <div className="blobSmall--yellow"></div>
            <div className="blobSmall--blue"></div>
            
        </div>
    )
}