import './App.css';
import Navbar from './Navbar';
import Screen from './Screen';
import Keypad from './Keypad';
import { useState, useEffect } from 'react';
import CheckCookie from './CheckCookie';
import SetCookie from './SetCookie';

// function to add commas to the figure of the final answer
const processAnswer = (number) => {
  let numberString = number.toString(); // convert number to string
  let stringArray = numberString.split("."); // seperate decimal and whole number
  let wholeNumber = stringArray[0]; // select whole number
  let newArray = [];
  if (wholeNumber.includes('-')) { // check if its a negative number
    newArray = wholeNumber.split("-"); // seperate the number from the minus sign
    wholeNumber = newArray[1]; // select the number
  }
  let numberOfDigits = wholeNumber.length // get number of digits
  let commaPosition = 3; // minimum comma position
  let numberOfCommas = numberOfDigits / commaPosition; // get total number of commas to be added
  let commaController = numberOfDigits % commaPosition; // check if the number of digits is a multiple of 3
  let comma = ','; // comma string
  numberOfCommas = parseInt(numberOfCommas); // convert number of comma to string

  // if comma is a multiple of 3, reduce the total number of commas to be added by 1
  if (commaController === 0) {numberOfCommas -= 1};
  // loop to add commas, limited by the total number of commas
  for (let index = 0; index < numberOfCommas; index++) {
    var position = numberOfDigits - commaPosition; // position to add comma
    // add comma
    wholeNumber = [wholeNumber.slice(0, position), comma, wholeNumber.slice(position)].join('');
    // increase current comma position by 3
    commaPosition += 3;
  }
  // if there was a decimal part of the initial number
  if (stringArray.length === 2) {
    // concatenate the decimal part back to the whole number
    wholeNumber += '.';
    wholeNumber += stringArray[1];
  }
  // if the original number was a negative number
  if (newArray.length === 2) {
    // concatenate the negative sign back to the whole number
    wholeNumber = '-'+wholeNumber;
  }
  // return whole number
  return wholeNumber;
}

// function to solve for and update the answer
const handleAnswer = (data, keypress, setAnswer) => {
  // if question is empty set answer as 0
  if (data === '') return setAnswer(0);
  
  // if last key is addition or substraction, add 0 at the end of equation since equation remains unchanged
  if (keypress === '+') data += '0';
  
  if (keypress === '-') {
    
    if (data.includes('/ - ')) {
      data = data.replaceAll('/ - ', '/ - 1');
    } else if (data.includes('x - ')) {
      data = data.replaceAll('x - ', 'x - 1');
    } else {
      data += '0';
    }
  }

  console.log(data);

  // if last key is multiplication or substraction, add 1 at the end of equation since equation remains unchanged
  if (keypress === 'x' || keypress === '/') data += '1';

  // replace all occurrence of 'x' with multiplication sign '*'
  data = data.replaceAll('x', '*');

  // remove all the space from the question data
  // also covert the corresponding result to an array
  let questionArray = data.split(" ");

  // console.table(questionArray);
  
  // for each of the element in the question array
  for (let index = 0; index < questionArray.length; index++) {
    // if the element is not an operator, i.e, a number
    if (questionArray[index] !== '+' && questionArray[index] !== '-' && questionArray[index] !== '*' && questionArray[index] !== '/') {
      // convert it to a float
      questionArray[index] = parseFloat(questionArray[index])
    }
  }

  // varaible to store the full question expression
  let evaluation = '';
  for (let index = 0; index < questionArray.length; index++) {
    // push each element accordingly into the expression
    evaluation += questionArray[index]+'';
  }

  if (evaluation.includes('--')) {
    evaluation = evaluation.replaceAll('--', '- -');
  }

  // evaluate answer
  // eslint-disable-next-line
  let rawAnswer = eval(evaluation);
  // console.log("🚀 ~ file: App.js ~ line 90 ~ handleAnswer ~ evaluation", evaluation)
  let stringifiedAnswer = processAnswer(rawAnswer);
  // console.log(rawAnswer);

  if (isNaN(rawAnswer)) return setAnswer("undefined");
  if (rawAnswer === Infinity || rawAnswer === -Infinity) return setAnswer(rawAnswer);
  setAnswer(stringifiedAnswer);
}

// funtion to update windows width
const handleResize = (windowWidth, setWindowWidth, setSlide) => {
  setWindowWidth(window.innerWidth);
  // if window width shows it is a desktop, slideOpen history tab
  if (windowWidth >= 1366) return setSlide(true);
}

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // state to store windows width
  const [keypress, setKeypress] = useState(() => null); // state to store last keypressed
  const [answer, setAnswer] = useState(() => '0'); // state to store answer
  const [clear, setClear] = useState(() => false); // variable to control whether to clear the question
  const [slide, setSlide] = useState(() => false); // state to slide in history section
  const [showQuestion, setShowQuestion] = useState(() => true); // state to control visibility of question
  const [question, setQuestion] = useState(() => ''); // state to store question
  const [root, setRoot] = useState(() => document.querySelector(':root')); // varaiable to store the color themes
  const [theme1, setTheme1] = useState(() => true); // state to controll visibility of theme 1 toggle button
  const [theme2, setTheme2] = useState(() => false); // state to controll visibility of theme 2 toggle button
  const [theme3, setTheme3] = useState(() => false); // state to controll visibility of theme 3 toggle button
  const [theme4, setTheme4] = useState(() => false); // state to controll visibility of theme 4 toggle button
  
  // important comment below to prevent the theme variable that wasn't used from triggering an error message
  // eslint-disable-next-line
  const [theme, setTheme] = useState(() => { // function to get default
    let data = CheckCookie(root); // check cookie for saved theme, returns the theme and the css root varaiable 
    setRoot(data.root); // set root variable
    if (data.theme === '1') { // if theme 1 is selected set theme1 toggle variable as true
      setTheme1(true)
      setTheme2(false)
      setTheme3(false)
      setTheme4(false)
    } else if (data.theme === '2') {  // if theme 2 is selected set theme1 toggle variable as true
      setTheme1(false)
      setTheme2(true)
      setTheme3(false)
      setTheme4(false)
    } else if (data.theme === '3'){  // if theme 3 is selected set theme1 toggle variable as true
      setTheme1(false)
      setTheme2(false)
      setTheme3(true)
      setTheme4(false)
    } else {  // if theme 4 is selected set theme1 toggle variable as true
      setTheme1(false)
      setTheme2(false)
      setTheme3(false)
      setTheme4(true)
    }
    return data.theme; // return the theme retrieved from cookie
  });

  // state to store the calculation history
  const [history, setHistory] = useState(() => {
    // select stord history from device storage
    let storedHistory = localStorage.getItem("history");
    // if storedHistory is not empty return storedHistory 
    if (storedHistory !== null && storedHistory !== '') return storedHistory;
    // if it is empty set it as a empty array
    localStorage.setItem("history", []);
    // return empty array
    return [];
  });

  // function to handle keypress, would ne called in keypad component
  const handleKeypress = (key) => {
    if (key === 'reset') return handleReset(key); // if keypressed is reset, return handle reset
    if (key === 'del') return handleDelete(key); // if keypressed is delete, return handle delete
    if (key === '=') return handleEquall(key); // if keypressed is equall, return handle euqall

    // else
    // setKeypres and handle the Question
    setKeypress(key);
    handleQuestion(key);
  }

  useEffect(() => {
    // add window resize event listener
    window.addEventListener('resize', handleResize(windowWidth, setWindowWidth, setSlide));
    if ( keypress === 'del' || keypress === 'reset' ) return;
    handleAnswer(question, keypress, setAnswer);
    
    // remove window resize event listener
    return () => {
      window.removeEventListener('resize', handleResize(windowWidth, setWindowWidth, setSlide));
    }
  }, [question, keypress, windowWidth, root]); // useeffect dependencies

  // handle question
  // console.log(eval("1 - - 0"));
  const handleQuestion = (key) => {
    // if keypressed is an operator
    if (key === '+' || key === '-' || key === 'x' || key === '/'){

      if (clear === false) { // clear is false
        if (question !== '') {
          setQuestion((prevKeys) => { // setQuestion
            // get prevQuestion and split into an array everywhere space appears
            let questionArray = prevKeys.split(" ");
            // get length of resulting array
            let lengthOfQuestion = questionArray.length;
            // get last element in array
            let lastNumber = questionArray[lengthOfQuestion - 1];
            
            // if last element is a number
            if (lastNumber !== '' ) {
              // concatenate the new string
              return prevKeys+' '+key+' ';
            } else { // if last element is an operator
              if (key !== '-') {
                prevKeys = prevKeys.slice(0, -3)
                return prevKeys+' '+key+' '; // concatenate the new operator
              } else {
                return prevKeys += key+' '; // concatenate the new operator
              }
            }
          });
        } else {
          if (key === '-') {
            setQuestion('- ');
          }
        }
      } else { // if clear is true

        setQuestion((prevKeys) => {
          // set the question as the current answer
          prevKeys = answer;
          if (prevKeys.includes('-')) {
            let newArray = prevKeys.split("-"); // seperate decimal and whole number
            prevKeys = '- '+newArray[1];    
          }
          return prevKeys+' '+key+' '; //concatenate the operator
        });

        // set clear as false and show answer
        setClear(false);
        setShowQuestion(true);
        
      }
    } else{ // if keypressed is a digit
      if (clear === false) { // if clear is false
        setQuestion((prevKeys) => {
          return prevKeys+''+key; // concantenate key to prevQuestion
        });
      } else { // if clear is true
        setQuestion(() => { 
          return key; // setQuestion as new key
        });

        // set clear as false and show answer
        setClear(false);
        setShowQuestion(true);

      }
    }
  }

  // handle reset function
  const handleReset = (key) => {
    // return clear, keypress, answer and question back to their default value
    setClear(false);
    setKeypress(key);
    setAnswer('0');
    setQuestion('');
    setShowQuestion(true);
  }

  // handle delete function
  const handleDelete = (key) => {

    // if clear is true, simply reset the stare
    if(clear === true) return handleReset(key);

    // else
    // new Question varaiable
    let newQuestion;
    let lastCharacter = question.slice(-1); // get last character
    let beforeLastCharacter = question.slice(-2, -1); // get second to last character
    let reject = [' ', '+', '-', 'x', '/']; // array of lastCharacter and second to lastcharacter to be reprocessed

    // if last character and second to last character are not in the array
    if (!reject.includes(lastCharacter) && !reject.includes(beforeLastCharacter)) {
      newQuestion = question.slice(0, -1); // store answer as new question
      setKeypress(beforeLastCharacter); // update keypressed with second to last character
      // set new question
      setQuestion(newQuestion);
    } else { // else
      // if before second to last character is a space
      if (beforeLastCharacter === ' ') {
        newQuestion = question.slice(0, -1); // get new question
        lastCharacter = newQuestion.slice(-1); // set new last character
        beforeLastCharacter = newQuestion.slice(-2, -1); // set new second to last character
        setKeypress(beforeLastCharacter); // set keypress as second to last character
        // set new question
        setQuestion(newQuestion);
      } else if (lastCharacter === ' ') { // if before last character is a space
        newQuestion = question.slice(0, -3); // set new question
        lastCharacter = newQuestion.slice(-2, -1); // set new last character
        setKeypress(lastCharacter); // set keypress to be last character
        // set new question
        setQuestion(newQuestion);
      }
    }
  }

  // handle equalls to
  const handleEquall = () => {
    // set showQuestion as false
    // i.e, make question display: none
    setShowQuestion(false);
    // set clear as true
    setClear(true);
    // content variable
    if (question === '') return;

    let content = `${question} = ${answer}`; // concantenate the question and answer
    let tempHistory = history; // get history array
    let index = tempHistory.length; // get length of history array
    let currentData; // current data to be added to history array
    if (history.length === 0) { // if history array is empty
      // current data object
      currentData = {
        content: content,
        key: index
      }
      // appent current data to begining of array
      tempHistory.unshift(currentData);
      // set history
      setHistory(tempHistory);
    } else { // if history is not empty
      // if new content is not a duplicate of most recent history
      if (history[0].content !== content) { 
        // set current data object
        currentData = {
          content: content,
          key: index
        }
        //  append to the begining or array
        tempHistory.unshift(currentData);
        // set history
        setHistory(tempHistory);
      }
    }

  }

  // function to handle slide, would be called in navbar component
  const handleSlide = () => {
    // onclick handle slidw invert slide value
    setSlide(!slide);
  }

  // function to handle set theme cookie, would be called in navbar component
  const handleSetCookie = (cname, cvalue, exdays) => {
    // run setCookie function, function retruens theme and css root varaiable
    let data = SetCookie(cname, cvalue, exdays, root);
    setRoot(data.root); // set root
    setTheme(data.theme); // set theme
    if (data.theme === '1') { // if theme 1 is selected set theme1 toggle variable as true
      setTheme1(true)
      setTheme2(false)
      setTheme3(false)
      setTheme4(false)
    } else if (data.theme === '2') {  // if theme 2 is selected set theme1 toggle variable as true
      setTheme1(false)
      setTheme2(true)
      setTheme3(false)
      setTheme4(false)
    } else if (data.theme === '3'){  // if theme 3 is selected set theme1 toggle variable as true
      setTheme1(false)
      setTheme2(false)
      setTheme3(true)
      setTheme4(false)
    } else {  // if theme 4 is selected set theme1 toggle variable as true
      setTheme1(false)
      setTheme2(false)
      setTheme3(false)
      setTheme4(true)
    }
  }
  
  // return App component
  return (
    <section className="App">
      <Navbar slide={slide} handleSlide={handleSlide} theme1={theme1} theme2={theme2} theme3={theme3} theme4={theme4} handleSetCookie={handleSetCookie} history={history} />
      <Screen answer={answer} question={question} showQuestion={showQuestion} />
      <Keypad handleKeypress={handleKeypress} />
    </section>
  );
}

export default App;
