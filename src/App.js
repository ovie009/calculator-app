import './App.css';
import Navbar from './Navbar';
import Screen from './Screen';
import Keypad from './Keypad';
import { useState, useEffect } from 'react';
import CheckCookie from './CheckCookie';
import SetCookie from './SetCookie';

const handleAnswer = (data, keypress, setAnswer) => {
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

  // let tempAnswer = eval(evaluation);
  // eslint-disable-next-line
  setAnswer(eval(evaluation));

}

const handleResize = (windowWidth, setWindowWidth, setSlide) => {
  setWindowWidth(window.innerWidth);
  if (windowWidth >= 1366) return setSlide(true);
}

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [keypress, setKeypress] = useState(() => null);
  const [answer, setAnswer] = useState(() => '0');
  const [clear, setClear] = useState(() => false);
  const [slide, setSlide] = useState(() => false);
  const [showQuestion, setShowQuestion] = useState(() => true);
  const [question, setQuestion] = useState(() => '');
  const [root, setRoot] = useState(() => document.querySelector(':root'));
  const [theme1, setTheme1] = useState(() => true);
  const [theme2, setTheme2] = useState(() => false);
  const [theme3, setTheme3] = useState(() => false);
  const [theme, setTheme] = useState(() => {
    let data = CheckCookie(root);
    setRoot(data.root);
    if (data.theme === '1') {
        setTheme1(true)
        setTheme2(false)
        setTheme3(false)
    } else if (data.theme === '2') {
        setTheme1(false)
        setTheme2(true)
        setTheme3(false)
    } else if (data.theme === '3'){
        setTheme1(false)
        setTheme2(false)
        setTheme3(true)
    }
    return data.theme;
  });

  const [history, setHistory] = useState(() => {
    let storedHistory = localStorage.getItem("history");
    console.log(storedHistory);
    if (storedHistory !== null && storedHistory !== '') return storedHistory;
    localStorage.setItem("history", []);
    return [];
  });

  const handleKeypress = (key) => {
    if (key === 'reset') return handleReset(key);
    if (key === 'del') return handleDelete(key);
    if (key === 'del') return handleEquall();
    setKeypress(key);
    handleQuestion(key);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize(windowWidth, setWindowWidth, setSlide));
    if ( keypress === 'del' || keypress === 'reset' ) return;
    handleAnswer(question, keypress, setAnswer);

    return () => {
      window.removeEventListener('resize', handleResize(windowWidth, setWindowWidth, setSlide));
    }
  }, [question, keypress, windowWidth, root]);

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

    let tempHistory = history;
    let index = tempHistory.length + 1;
    let currentHistory = {
      content: `${question} = ${answer}`,
      index: index
    }
    tempHistory.push(currentHistory);
    setHistory(tempHistory);

  }

  const handleSlide = () => {
    setSlide(!slide);
  }

  const handleSetCookie = (cname, cvalue, exdays) => {
    console.log(cvalue);
    let data = SetCookie(cname, cvalue, exdays, root);
    setRoot(data.root);
    setTheme(data.theme);
    if (data.theme === '1') {
      setTheme1(true)
      setTheme2(false)
      setTheme3(false)
    } else if (data.theme === '2') {
      setTheme1(false)
      setTheme2(true)
      setTheme3(false)
    } else if (data.theme === '3'){
      setTheme1(false)
      setTheme2(false)
      setTheme3(true)
    }
  }

  return (
    <section className="App">
      <Navbar slide={slide} handleSlide={handleSlide} theme1={theme1} theme2={theme2} theme3={theme3} handleSetCookie={handleSetCookie} history={history} />
      <Screen answer={answer} question={question} showQuestion={showQuestion} />
      <Keypad handleKeypress={handleKeypress} handleEquall={handleEquall} />
    </section>
  );
}

export default App;
