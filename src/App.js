import './App.css';
import Navbar from './Navbar';
import Screen from './Screen';
import Keypad from './Keypad';
import { useState, useEffect } from 'react';

function App() {

  
  const [keypress, setKeypress] = useState(() => null);
  const [answer, setAnswer] = useState(() => '0');
  const [clear, setClear] = useState(() => false);
  const [showQuestion, setShowQuestion] = useState(() => true);
  const [question, setQuestion] = useState(() => '');


  const handleKeypress = (key) => {
    if (key === 'reset') return handleReset(key);
    if (key === 'del') return handleDelete(key);
    if (key === 'del') return handleEquall();
    setKeypress(key);
    handleQuestion(key);
  }
  
  useEffect(() => {
    if ( keypress === 'del' || keypress === 'reset' ) return;
    handleAnswer(question);
  }, [question, keypress]);


  const handleAnswer = (data) => {
    // console.log(data);
    if (data === '') return setAnswer(0);
    
    if (keypress === '+' || keypress === '-') data += '0';

    if (keypress === 'x' || keypress === '/') data += '1';

    // console.log(data);

    data = data.replaceAll('x', '*');
    let questionArray = data.split(" ");
    // console.table(questionArray);
    
    for (let index = 0; index < questionArray.length; index++) {
      if (questionArray[index] !== '+' && questionArray[index] !== '-' && questionArray[index] !== '*' && questionArray[index] !== '/') {
        // console.log(questionArray[index])
        questionArray[index] = parseFloat(questionArray[index])
      }
    }
    // console.log(questionArray);

    let evaluation = '';
    for (let index = 0; index < questionArray.length; index++) {
      evaluation += questionArray[index];
    }

    let tempAnswer = eval(evaluation);
    // console.log(tempAnswer);
    // console.log(keypress);
    setAnswer(eval(evaluation));

  }

  const handleQuestion = (key) => {
    if (key === 'del' || key === 'reset') return;
    if (key === '+' || key === '-' || key === 'x' || key === '/'){

      if (clear === false) {
        setQuestion((prevKeys) => {
          let questionArray = prevKeys.split(" ");
          let lengthOfQuestion = questionArray.length;
          let lastNumber = questionArray[lengthOfQuestion - 1];
          
          if (lastNumber !== '' ) {
            return prevKeys+' '+key+' ';
          } else {
            prevKeys = prevKeys.slice(0, -3);
            return prevKeys+' '+key+' ';
          }
        });
      } else {

        setQuestion((prevKeys) => {
          prevKeys = answer;
          return prevKeys+' '+key+' ';
        });

        setClear(false);
        setShowQuestion(true);
        
      }
    } else{
      if (clear === false) {
        setQuestion((prevKeys) => {
          return prevKeys+''+key;
        });
      } else {

        setQuestion((prevKeys) => {
          return key;
        });
        setClear(false);
        setShowQuestion(true);

      }
    }
  }

  const handleReset = (key) => {
    setKeypress(key);
    setAnswer('0');
    setQuestion('');
  }

  const handleDelete = () => {
    console.log(question);
    let newQuestion = question.slice(0, -1);
    let lastCharacter = newQuestion.slice(-1);
    let reject = [' ', '+', '-', 'x', '/'];

    while (reject.includes(lastCharacter)) {
      newQuestion = newQuestion.slice(0, -1);
      lastCharacter = newQuestion.slice(-1);
    }
    console.log(newQuestion);
    setQuestion(newQuestion);
    
  }

  const handleEquall = () => {
    setShowQuestion(false);
    setClear(true);
  }



  return (
    <section className="App">
      <Navbar/>
      <Screen answer={answer} question={question} showQuestion={showQuestion} />
      <Keypad handleKeypress={handleKeypress} handleEquall={handleEquall} />
    </section>
  );
}

export default App;
