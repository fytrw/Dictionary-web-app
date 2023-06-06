import { ReactComponent as Logo} from "../assets/images/logo.svg"
import { ReactComponent as ArrowDown } from "../assets/images/icon-arrow-down.svg"
import { ReactComponent as Moon} from "../assets/images/icon-moon.svg"
import  {useState} from 'react'


function Header({darkMode, setDarkMode, fontStyle, setFontStyle}) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelectStyle = (style) => {
    setFontStyle(style);
    setDropdownVisible(false);
  }

    return (
        <header>
            <Logo/>
            <div className="appearance">
                <div className="font-style">
                    <p onClick={() => setDropdownVisible(!dropdownVisible)}>{fontStyle}</p>
                    <ArrowDown onClick={() => setDropdownVisible(!dropdownVisible)}/>
                    {dropdownVisible && (
                      <div className="font-dropdown">
                        <p onClick={() => handleSelectStyle('Sans Serif')}>Sans Serif</p>
                        <p onClick={() => handleSelectStyle('Serif')}>Serif</p>
                        <p onClick={() => handleSelectStyle('Mono')}>Mono</p>
                      </div>
                    )}
                </div>
                <div className="dark-mode">
                    <input 
                    type="checkbox" 
                    id="switch"
                    checked={darkMode} 
                    onChange={() => setDarkMode(!darkMode)}
                    /><label htmlFor="switch">Toggle</label>
                    <Moon className={darkMode ? 'svg-icon darkMode' : 'svg-icon'}/> 
                </div>
            </div>
        </header>
    )
  }
  
  export default Header