import './keypad.css';

const Keypad = () => {
    return (  
        <div className="keypad">
            <button type='button' className="key">7</button>
            <button type='button' className="key">8</button>
            <button type='button' className="key">9</button>
            <button type='button' className="key-del">DEL</button>
            <button type='button' className="key">4</button>
            <button type='button' className="key">5</button>
            <button type='button' className="key">6</button>
            <button type='button' className="key">+</button>
            <button type='button' className="key">1</button>
            <button type='button' className="key">2</button>
            <button type='button' className="key">3</button>
            <button type='button' className="key">-</button>
            <button type='button' className="key">.</button>
            <button type='button' className="key">0</button>
            <button type='button' className="key">/</button>
            <button type='button' className="key">x</button>
            <button type='button' className="key-reset">RESET</button>
            <button type='button' className="key-equall">=</button>
        </div>
    );
}
 
export default Keypad;