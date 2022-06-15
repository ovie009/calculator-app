import './Screen.css'

const Screen = ({answer, question, showQuestion}) => {
    return ( 
        <div className="screen">
            <span className="query" style={{
                display: `${showQuestion ? 'block' : 'none'}`
            }}>
                {question}
            </span>
            <p className="display">
                {answer}
            </p>
        </div>
    );
}
 
export default Screen;