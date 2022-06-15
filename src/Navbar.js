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
                    <button className="theme-button theme-2">
                        <span className='theme-button-label'>2</span>
                    </button>
                    <button className="theme-button theme-3">
                        <span className='theme-button-label'>3</span>
                    </button>
                </div>
                <ion-icon name="time-outline"></ion-icon>
            </div>
        </nav>
    );
}
 
export default Navbar;