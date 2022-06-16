import './Navbar.css';

const Navbar = ({slide, handleSlide, theme1, theme2, theme3, handleSetCookie, history}) => {
    
    // if(!history){
    //     history = [];
    // }
    return (  
        <nav className="navbar">
            <h1 className="logo">
                calc
            </h1>
            <div className='nav-items'>
                <span className="theme-text">
                    theme
                </span>
                <div className="theme-buttons-wrapper">
                    <button className={theme1 ? "theme-button active-theme" : "theme-button"} onClick={() => {handleSetCookie('theme', '1', 30)}}>
                        <span className='theme-button-label'>1</span>
                    </button>
                    <button className={theme2 ? "theme-button active-theme" : "theme-button"} onClick={() => {handleSetCookie('theme', '2', 30)}}>
                        <span className='theme-button-label'>2</span>
                    </button>
                    <button className={theme3 ? "theme-button active-theme" : "theme-button"}  onClick={() => {handleSetCookie('theme', '3', 30)}}>
                        <span className='theme-button-label'>3</span>
                    </button>
                </div>
                <button type='button' className='open-history' onClick={handleSlide}>
                    <ion-icon name="time-outline" className="history-icon"></ion-icon>
                </button>
            </div>
            <div className="sidebar" style={{
                right: `${slide ? '0px' : '-300px'}`
            }}>
                <h3>
                    History
                    <button type='button' className='close-history' onClick={handleSlide}>
                        <ion-icon name="close-outline" className="close-icon"></ion-icon>
                    </button>
                </h3>
                {
                    history.map((hist) => (
                        <p key={hist.index}>
                            {hist.content}
                        </p>
                    ))
                }
            </div>
        </nav>
    );
}
 
export default Navbar;