import React from 'react'
import Main from "./components/Main"
import Quiz from "./components/Quiz"
import { useEffect, useState } from 'react'





export default function App() {


    const [quiz, setQuiz] = React.useState(true) 
    const [categories, setCategories] = useState([])
    const [difficulty, setDifficulty] = useState("")
    const [category, setCategory] = useState("")
  


    useEffect(()=> {

        function getCategories() {
            fetch('https://opentdb.com/api_category.php')
              .then((res) => res.json())
              .then((json) => {
                const allCategories = json.trivia_categories;
                allCategories.map((category) => {
                  setCategories((prevCategories) => [
                    ...prevCategories,
                    {
                      id: category.id,
                      name: category.name,
                    },
                  ]);
                });
              })
              .catch((error) => console.log('Error: ' + error));
          }
          getCategories()

     }, [])

function selectDifficulty(event){
   
   setDifficulty(event.target.value)
   
    
}

function selectCategory(event){
   setCategory(prevValue => {
       return {
        ...prevValue,
        value: event.target.value,
       
    }
   })


   
}

console.log(category.value)
    
function generateQuiz() {
    setQuiz(prevValue => prevValue = !prevValue)
}
    
    return (
        <div className="container">
            {quiz && <Main categories={categories} name={category.value} difficulty={selectDifficulty} quizCategory={category.value} quizDifficulty={difficulty} idCategory={category.id} category={selectCategory} generateQuiz={generateQuiz} /> }
            {!quiz && <Quiz home={generateQuiz} difficulty={difficulty} category={category.value}/>}
        
        </div>
    )
}