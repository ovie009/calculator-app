import './Navbar.css'

const Navbar = () => {
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
                    <button className="theme-button theme-1">
                        <span className='theme-button-label'>1</span>
                    </button>
                    <button className="theme-button theme-2 active-theme">
                        <span className='theme-button-label'>2</span>
                    </button>
                    <button className="theme-button theme-3">
                        <span className='theme-button-label'>3</span>
                    </button>
                </div>
                <button type='button' className='open-history'>
                    <ion-icon name="time-outline" className="history-icon"></ion-icon>
                </button>
            </div>
            <div className="sidebar">
                <h3>
                    History
                    <button type='button' className='close-history'>
                        <ion-icon name="close-outline" className="close-icon"></ion-icon>
                    </button>
                </h3>
                <p> 5 + 10 = 15</p>
                <p> 20 / 4 = 5</p>
            </div>
        </nav>
    );
}
 
export default Navbar;