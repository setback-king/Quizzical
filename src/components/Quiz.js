import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import arrayShuffle from "array-shuffle";

export default function Quiz(props) {
  const [data, setData] = useState([]);
  const [choice, setChoice] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [game, setGame] = useState(false);

  useEffect(() => {
    function fetchData() {
      fetch(
        `https://opentdb.com/api.php?amount=5&category=${props.category}&difficulty=${props.difficulty}&type=multiple`
      )
        .then((res) => res.json())
        .then((data) => setData(data.results))
        .catch((error) => console.log("Error: " + error));
    }

    fetchData();
  }, [game, props.difficulty, props.category]);

  useEffect(() => {
    function storeQuestions() {
      setChoice((prevValue) => {
        const questionContainer = [];
        data.map((item) => {
          let obj = {
            question: item.question,
            correct: item.correct_answer,
            incorrect: item.incorrect_answers,
            // took out arrayShuffle to keep answer array in same order. map over that array to from new object state
            answers: [
              item.correct_answer,
              item.incorrect_answers[0],
              item.incorrect_answers[1],
              item.incorrect_answers[2],
            ],
            id: nanoid(),
          };
          questionContainer.push(obj);
        });

        let shuffledQuestions = arrayShuffle(questionContainer);
        return shuffledQuestions;
      });
    }
    storeQuestions();
  }, [data]);

  useEffect(() => {
    function storeAnswers() {
      setAnswers((prevValue) => {
        const answerArray = [];
        choice.map((choices) => {
          const questionContainer = [
            { questions: choices.question, id: nanoid() },
          ];
          const tempContainer = [];
          const allItems = [];
          for (let i = 0; i < choices.answers.length; i++) {
            let answerObj = {
              answer: choices.answers[i],
              correct: i === 0 ? true : false,
              selected: false,
              id: nanoid(),
              background: "",
              opacity: "",
            };
            tempContainer.push(answerObj);
          }
          const test = arrayShuffle(tempContainer);
          allItems.push(...test);

          allItems.push(...questionContainer);
          return answerArray.push(allItems);
        });
        return answerArray;
      });
    }
    storeAnswers();
  }, [choice]);

  
  function checkAnswers() {
    
    setChecked((prevValue) => !prevValue);
    setAnswers((prevAnswers) => {
      return prevAnswers.map((item) => item.map((single) => {
        if (single.selected === true && single.correct === true) {
         setCount((prevCount) => (prevCount + 1));
          return {
            ...single,
            background: "#94D7A2",
          };
        } else if (single.selected === true && single.correct === false) {
          return {
            ...single,
            background: "#F8BCBC",
            opacity: "0.5",
          };
        } else if (single.selected === false && single.correct === true) {
          return {
            ...single,
            background: "#94D7A2",
          };
        }
        else
          return {
            ...single,
            opacity: "0.5",
            background: "",
          };
          
      }));
    
    });
   
  }
  
  

  function selectChoice(id, questionID) {
    console.log(questionID);

    setAnswers((prevAnswers) => {
      return prevAnswers.map((item) => {
        if (item[4].id === questionID) {
          return item.map((single) => {
            return single.id === id
              ? { ...single, selected: !single.selected, background: "#D6DBF5" }
              : { ...single, selected: false, background: "" };
          });
        } else return item;
      });
    });
  }

  function newGame() {
    setChecked((prevValue) => !prevValue);
    setCount(0);
    setGame((prevValue) => !prevValue);
  }

  let questionElements = answers.map((item, index) => {
    //let item = item[0]

    return (
      <div key={nanoid()} className="multiple">
        <h4>{decode(item[4].questions)}</h4>
        <div className="answers">
          <div
            onClick={() => selectChoice(item[0].id, item[4].id)}
            style={{
              backgroundColor: item[0].background,
              opacity: item[0].opacity,
            }}
            className={"choices"}
            key={item[0].id}
          >
            {decode(item[0].answer)}
          </div>
          <div
            onClick={() => selectChoice(item[1].id, item[4].id)}
            style={{
              backgroundColor: item[1].background,
              opacity: item[1].opacity,
            }}
            className={"choices"}
            key={item[1].id}
          >
            {decode(item[1].answer)}
          </div>
          <div
            onClick={() => selectChoice(item[2].id, item[4].id)}
            style={{
              backgroundColor: item[2].background,
              opacity: item[2].opacity,
            }}
            className={"choices"}
            key={item[2].id}
          >
            {decode(item[2].answer)}
          </div>
          <div
            onClick={() => selectChoice(item[3].id, item[4].id)}
            style={{
              backgroundColor: item[3].background,
              opacity: item[3].opacity,
            }}
            className={"choices"}
            key={item[3].id}
          >
            {decode(item[3].answer)}
          </div>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="quiz">
      {questionElements}

      {checked ? (
        <div className="newGame">
          <span className="score">You scored {count} / 5 correct</span>
          <button className="btn--newGame" onClick={newGame}>
            Play Again
          </button>
          <button className="btn--newGame" onClick={props.home}>
            Main Menu
          </button>
        </div>
      ) : (
        <button className="btn--check" onClick={checkAnswers}>
          Check Answers
        </button>
      )}
      <div className="blobSmall--yellow"></div>
      <div className="blobSmall--blue"></div>
    </div>
  );
}
