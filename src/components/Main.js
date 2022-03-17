import { nanoid } from "nanoid";

export default function Main(props) {
  const generateCategories = props.categories.map((category) => {
    return (
      <option id={category.id} value={category.id} key={nanoid()}>
        {category.name}
      </option>
    );
  });

  return (
    <main className="home">
      <h1 className="title">Quizzical</h1>
      <p className="description">
        Please select a category and difficulty. Click on Start Quiz to begin.
      </p>
      <label htmlFor="categories">Choose a category:</label>
      {props.alerts ? (
        <div className="alert">Please select a category</div>
      ) : (
        ""
      )}
      <select
        onChange={props.category}
        name={props.name}
        value={props.quizCategory}
        className="selectCategory"
      >
        <option selected disabled>
          Select...
        </option>
        {generateCategories}
      </select>
      <label htmlFor="difficulty">Choose a difficulty:</label>
      <select
        onChange={props.difficulty}
        name="difficulty"
        value={props.quizDifficulty}
        className="selectDifficulty"
        id="difficulty"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button className="btn--start" onClick={props.generateQuiz}>
        Start Quiz
      </button>
      <div className="blob--yellow"></div>
      <div className="blob--blue"></div>
    </main>
  );
}
