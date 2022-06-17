import './keypad.css';

const Keypad = ({handleKeypress}) => {

    return (  
        <div className="keypad">
            <button type='button' onClick={() => handleKeypress('7')} className="key">7</button>
            <button type='button' onClick={() => handleKeypress('8')} className="key">8</button>
            <button type='button' onClick={() => handleKeypress('9')} className="key">9</button>
            <button type='button' onClick={() => handleKeypress('del')} className="key-del">DEL</button>
            <button type='button' onClick={() => handleKeypress('4')} className="key">4</button>
            <button type='button' onClick={() => handleKeypress('5')} className="key">5</button>
            <button type='button' onClick={() => handleKeypress('6')} className="key">6</button>
            <button type='button' onClick={() => handleKeypress('+')} className="key">+</button>
            <button type='button' onClick={() => handleKeypress('1')} className="key">1</button>
            <button type='button' onClick={() => handleKeypress('2')} className="key">2</button>
            <button type='button' onClick={() => handleKeypress('3')} className="key">3</button>
            <button type='button' onClick={() => handleKeypress('-')} className="key">-</button>
            <button type='button' onClick={() => handleKeypress('.')} className="key">.</button>
            <button type='button' onClick={() => handleKeypress('0')} className="key">0</button>
            <button type='button' onClick={() => handleKeypress('/')} className="key">/</button>
            <button type='button' onClick={() => handleKeypress('x')} className="key">x</button>
            <button type='button' onClick={() => handleKeypress('reset')} className="key-reset">RESET</button>
            <button type='button' onClick={() => handleKeypress('=')} className="key-equall">=</button>
        </div>
    );
}
 
export default Keypad;