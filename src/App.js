import React from "react";
import Main from "./components/Main";
import Quiz from "./components/Quiz";
import { useEffect, useState } from "react";

export default function App() {
  const [quiz, setQuiz] = useState(false);
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    function getCategories() {
      fetch("https://opentdb.com/api_category.php")
        .then((res) => res.json())
        .then((json) => {
          const allCategories = json.trivia_categories;
          allCategories.map((category) => {
            return (setCategories((prevCategories) => [
              ...prevCategories,
              {
                id: category.id,
                name: category.name,
              },
            ]));
          });
        })
        .catch((error) => console.log("Error: " + error));
    }
    getCategories();
  }, []);

  function selectDifficulty(event) {
    setDifficulty(event.target.value);
  }

  function selectCategory(event) {
    setCategory((prevValue) => {
      return {
        ...prevValue,
        value: event.target.value,
      };
    });
  }

  

  function generateQuiz(e) {
    if (category.value === undefined) {
      e.preventDefault();
      setAlert((prevValue) => !prevValue);
    } else {
      setQuiz((prevValue) => (prevValue = !prevValue));
      setAlert((prevValue) => (prevValue = false));
    }
  }

  return (
    <div className="container">
      {!quiz && (
        <Main
          alerts={alert}
          categories={categories}
          name={category.value}
          difficulty={selectDifficulty}
          quizCategory={category.value}
          quizDifficulty={difficulty}
          category={selectCategory}
          generateQuiz={generateQuiz}
        />
      )}
      {quiz && (
        <Quiz
          home={generateQuiz}
          difficulty={difficulty}
          category={category.value}
        />
      )}
    </div>
  );
}
