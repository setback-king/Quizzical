
export default function Question(props) {
    return (
        <div className="multiple">
            <h4>{props.question}</h4>
            <div className="answers">
                <div className="choices">{props.choiceOne}</div>
                <div className="choices">{props.choiceTwo}</div>
                <div className="choices">{props.choiceThree}</div>
                <div className="choices">{props.choiceFour}</div>
            </div>
            <hr/>
            
        
        </div>
    )
}