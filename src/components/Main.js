
export default function Main(props) {
    return (
        <main className="home">
            <h1 className="title">Quizzical</h1>
            <p className="description">Some description is needed</p>
            <button className="btn--start" onClick={props.generateQuiz}>Start Quiz</button>
            <div className="blob--yellow"></div>
            <div className="blob--blue"></div>
        
        </main>
    )
}

