
import {nanoid} from "nanoid";
import { decode } from 'html-entities';
import { useEffect, useState } from 'react'
import arrayShuffle from "array-shuffle";

export default function Quiz(props) {
    
    
    const [data, setData] = useState([]);
    const [choice, setChoice] = useState([]);
    const [answers, setAnswers] = useState([])
    const [checked, setChecked] = useState(false)


    
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
                        // took out arrayShuffle to keep answer array in same order. map over that array to from new object state
                        answers: [item.correct_answer, item.incorrect_answers[0], item.incorrect_answers[1], item.incorrect_answers[2]],
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
    
    useEffect(() => {
        function storeAnswers(){
            setAnswers(prevValue => {
                const answerArray = []
                choice.map(choices => {
            
                    const questionArray = [{questions: choices.question}]
                    const workArray = []
                    const totalArray = []
                    for(let i = 0; i < choices.answers.length; i++) {
                    let answerObj = {
                        answer: choices.answers[i],
                        correct: (i === 0 ? true : false),
                        selected: false,
                        id: nanoid()
                        }
                    workArray.push(answerObj)
                    
                  }
                    const test = arrayShuffle(workArray)
                    totalArray.push(...test)
                      
                       totalArray.push(...questionArray)
                       return answerArray.push(totalArray)
                })
                return answerArray
            })
            
        }
        storeAnswers()
    }, [choice])
  
console.log(answers)

    function checkAnswers() {
        setChecked(prevValue => prevValue = !prevValue)
    }


    function selectChoice(id, index){
        console.log(id)
        setAnswers(prevAnswers => {
            const newFinish = []
            prevAnswers.map(item => {
                const newAnswers = []
                for(let i = 0; i < item.length; i++) {
                    if(item[i].id === id) {
                        let objj = {
                            ...item[i],
                            selected: !item[i].selected  
                        }
                        newAnswers.push(objj)
                    }
                    else {
                        newAnswers.push({
                            ...item[i],
                            selected: item[i].selected
                        })
                    }

                   
                }
                newFinish.push(newAnswers)
            })
            return newFinish
        })
    }


       /* setAnswers(prevValue => {
            const newValues = []
            prevValue.map(item => {
                let trial = []
                item[0].map(single => {
                if(single.id === id) {
                    let newObj = {
                        ...single,
                        selected: !single.selected
                    }
                    trial.push(newObj)
                }
                else trial.push(single)

                })
                let combinedValues = []
                combinedValues.push(trial)
                combinedValues.push(item[1])
                newValues.push(combinedValues)
            })    
            
            return newValues        
        })

        */



    

  


  function newGame() {
        setChecked(prevValue => prevValue = !prevValue)
    }
    
    let questionElements = answers.map((item, index) => {
       //let item = item[0]
      
    return  <div key={nanoid()} className="multiple">
    
                <h4>{decode(item[4].questions)}</h4>
                <div className="answers">
                    <div onClick={() => selectChoice(item[0].id, index)} className={item[0].selected ? "selected choices" : "choices"} key={item[0].id}>{decode(item[0].answer)}</div>  
                    <div onClick={() => selectChoice(item[1].id, index)} className={item[1].selected ? "selected choices" : "choices"} key={item[1].id}>{decode(item[1].answer)}</div>
                    <div onClick={() => selectChoice(item[2].id, index)} className={item[2].selected ? "selected choices" : "choices"} key={item[2].id}>{decode(item[2].answer)}</div>
                    <div onClick={() => selectChoice(item[3].id, index)} className={item[3].selected ? "selected choices" : "choices"} key={item[3].id}>{decode(item[3].answer)}</div>
                </div>
                 <hr/>
            </div>

    })
    
    
    
  

    


    return (
        <div className="home">
            {questionElements}
            
            
            {checked ?  <div className="newGame"> 
            <span className="score">You scored count / 5 </span> 
            <button className="btn--newGame" onClick={newGame}>Play Again</button>
            </div>
            : 
            <button className="btn--check" onClick={checkAnswers}>Check Answers</button> 
            }
            <div className="blobSmall--yellow"></div>
            <div className="blobSmall--blue"></div>
            
        </div>
    )
}